---
sidebar_position: 10
title: Openai .ini File Translation Example
---

Openai .ini File Translation Example
====================================

## Introduction

This article presents an example of a method to translate a language pack using openai.com. It seemed necessary to use this method to fulfil a requirement for a language pack in Scottish Gaelic without the availability of Gaelic speaking translators. 

## Preparation

The default English language pack contains .ini files for three clients: admin (454 files), api (2 files) and site (69 files). Lists of the .ini files were made in three .txt files, as in this short example for the list of admin .ini files:

```
com_actionlogs.ini
com_actionlogs.sys.ini
com_admin.ini
com_admin.sys.ini
com_ajax.ini
...
plg_workflow_notification.sys.ini
plg_workflow_publishing.ini
plg_workflow_publishing.sys.ini
tpl_atum.ini
tpl_atum.sys.ini
```

The PHP script used for translation is shown in full below. It was intended initially for one-time use only so was not *polished* for public eyes. It is run from the command line:

```
php initrans.php
```

Two parameters are hard-coded:

- A personal api key on line 13 or thereabout.
- The client list to process (admin, api or site) right at the end of the file.

The script processes each English .ini file in turn, breaks it into short sections of up to 25 lines and sends each section to openai.com for translation. The translated sections are then reassembled and output to a new language .ini file.

The script outputs the name of each file being processed. If something goes wrong there is a message to that effect. The longer lists of .ini files did run into completion problems, probably related to openai usage rates. In those cases the solution is to delete the translated files with problems and run the script again. It skips the .ini files that have already been translated.

Lots of improvements are possible:

- Although each line in an .ini file is split into key and value, they are not used. The whole line is submitted for translation with appropriate instructions.
- Some experimentation with the openai message parameters may improve performance.

## The initrans.php file

```php
<?php

class ChatGPTIniTranslate {

    /**
     * Base path for ini files in an existing Joomla installation.
     */
    public $base = '/Users/ceford/Sites/joomla-cms5/';

    /**
     * Personal openai api key: https://platform.openai.com/account/api-keys
     */
    private static $open_ai_key = 'your_api_key_goes_here';

    /**
     * URL of current version of the API endpoint.
     */
    private static $open_ai_url = 'https://api.openai.com/v1';

    /**
     * Process one of the client ini folders
     *
     * @param   string  $folder The name of the folder: api, admin or site
     *
     * @return void
     */
    public function go($folder) {

        switch ($folder) {
            case 'api':
                $source = "api/language/en-GB/";
                $sink   = "/Users/ceford/git/cefjdemos-pkg-gd-gb/gd-GB/api_gd-GB/";
                break;
            case 'admin':
                $source = "administrator/language/en-GB/";
                $sink   = "/Users/ceford/git/cefjdemos-pkg-gd-gb/gd-GB/admin_gd-GB";
                break;
            case 'site':
                $source  = "language/en-GB/";
                $sink   = "/Users/ceford/git/cefjdemos-pkg-gd-gb/gd-GB/site_gd-GB/";
                break;
            default:
                die("unkown folder: {$folder}\n");
        }

        // Read in the list of source files.
        $files = file_get_contents(__DIR__ . "/{$folder}.txt");
        $lines = explode(PHP_EOL, $files);
        $count = 0;
        $pattern = '/(.*)"(.*)"/';
        foreach ($lines as $line) {
            if (empty(trim($line))) {
                continue;
            }

            // If the translation has been done, skip this file.
            if (is_file($sink . $line)) {
                continue;
            }

            // Create an empty file.
            file_put_contents($sink . $line, "");

            // Read in the English ini file.
            $inifile = file_get_contents($this->base . $source . $line);
            echo "Processing {$source}{$line}\n";
            $inilines = explode(PHP_EOL, $inifile);
            $inicount = 0;
            $batch = [];
            foreach ($inilines as $iniline) {
                $test = preg_match($pattern, $iniline, $matches);

                if (!empty($test)) {
                    // The key is in $matches[1] and the value in $matches[2]
                    $keys[$inicount] = $matches[1];

                   // Add the whole line to the batch
                    $batch[] = $matches[0];
                    $inicount += 1;
                    // If the batch is a multiple of 25 send it for translation.
                    if ($inicount % 25 === 0) {
                        file_put_contents($sink . $line, $this->translateme($batch), FILE_APPEND);
                        $batch = [];
                    }
                } else {
                    // Output any pending batch translations.
                    if (!empty($batch)) {
                        file_put_contents($sink . $line, $this->translateme($batch), FILE_APPEND);
                    }

                   // Output the line unchanged
                    file_put_contents($sink . $line, "{$iniline}\n", FILE_APPEND);

                   $batch = [];
                }
            }

            // Translate any lines still in the batch;
            if (!empty($batch)) {
                file_put_contents($sink . $line, $this->translateme($batch), FILE_APPEND);
            }
            $count += 1;
        }

        echo "Total = {$count}\n\n";
    }

    /**
     * Prepare a batch of lines for translation
     *
     * @param array $batch The array of lines so far.
     */
    protected function translateme($batch) {
        $text = implode("\n", $batch);

        // submit a batch of lines to openai.com for translation.
        $translation = $this->getTranslation('Scottish Gaelic', $text);

        return "{$translation}\n";
    }

    /**
     * Compose the message to be sent to openai.com
     *
     * @param   string  $language_name      The name of the destination language in English
     * @param   string  $paragraphBuffer    The text to be translated.
     *
     * @return  string  The translated text or the original text with comments.
     */
    protected function getTranslation($language_name, $paragraphBuffer) {
        $instruction = "Please translate the following ini file text from English to {$language_name}";
        if ($language_name == 'German') {
            $instruction .= ' Please use the word Beiträge rather than Artikel. ';
        }

        $messages = [
            [
                "role" => "system",
                "content" => "You are a translator who translates text from English to {$language_name}. " .
                "Provide only the translated text, without any comments or explanations. " .
                "The text is in ini file format with a key followed by the value to be translated in double quotes" .
                "The translated value must be on one line."
            ],
            [
            'role' => 'user',
            'content' => $instruction . ": \n" .
            $paragraphBuffer,
            ],
        ];

        $return = $this->chat($messages);
        if (empty($return['choices'])) {
            // Find out what is going on!
            //var_dump($return, $messages);
            echo "Untranslated text: " . substr($paragraphBuffer, 0, 64) . "\n";
            return "<!-- untranslated -->\n{$paragraphBuffer}\n<!-- enduntranslated -->\n";
        } else {
            return $return['choices'][0]['message']['content'];
        }
    }

    /**
     * Set the openai parameters and create a message: https://platform.openai.com/docs/api-reference/chat/create
     *
     * @param array $messages (each item must have "role" and "content" elements, this is the whole conversation)
     * @param int $maxTokens maximum tokens for the response in ChatGPT (1000 is the limit for gpt-3.5-turbo)
     * @param string $model valid options are "gpt-3.5-turbo", "gpt-4", and in the future probably "gpt-5"
     * @param int $responseVariants how many response to come up with (normally we just want one)
     * @param float $frequencyPenalty between -2.0 and 2.0, penalize new tokens based on their existing frequency in the answer
     * @param int $presencePenalty between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the conversation so far, increasing the AI's chances to write on new topics.
     * @param int $temperature default is 1, between 0 and 2, higher value makes the model more random in its discussion (going on tangents).
     * @param string $user if you have distinct app users, you can send a user ID here, and OpenAI will look to prevent common abuses or attacks
     */
    protected function chat(
        $messages = [],
        $maxTokens=2000,
        $model='gpt-4o',
        $responseVariants=1,
        $frequencyPenalty=0,
        $presencePenalty=0,
        $temperature=1,
        $user='') {

        //create message to post
        $message = new stdClass();
        $message -> messages = $messages;
        $message -> model = $model;
        $message -> n = $responseVariants;
        $message -> frequency_penalty = $frequencyPenalty;
        $message -> presence_penalty = $presencePenalty;
        $message -> temperature = $temperature;

        if($user) {
            $message -> user = $user;
        }

        $result = self::_sendMessage('/chat/completions', data: json_encode($message));

        return $result;
    }

    /**
     * Send the request message to openai.
     *
     * @param string $endpoint  Endpoint obtained from the openai url
     * @param string $data      The json encoded data to be sent.
     * @param string $method    Deafults to post.
     *
     * @return object The response to the request.
     */
    private static function _sendMessage($endpoint, $data = '', $method = 'post') {
        $apiEndpoint = self::$open_ai_url.$endpoint;

        $curl = curl_init();

        if($method == 'post') {
            $params = array(
                CURLOPT_URL => $apiEndpoint,
                CURLOPT_SSL_VERIFYHOST => false,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 90,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "POST",
                CURLOPT_NOBODY => false,
                CURLOPT_HTTPHEADER => array(
                  "content-type: application/json",
                  "accept: application/json",
                  "authorization: Bearer ".self::$open_ai_key
                )
            );
            curl_setopt_array($curl, $params);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        } else if($method == 'get') {
            $params = array(
                CURLOPT_URL =>  $apiEndpoint . ($data!=''?('?'.$data):''),
                CURLOPT_SSL_VERIFYHOST => false,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 90,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => "GET",
                CURLOPT_NOBODY => false,
                CURLOPT_HTTPHEADER => array(
                  "content-type: application/json",
                  "accept: application/json",
                  "authorization: Bearer ".self::$open_ai_key
                )
            );
            curl_setopt_array($curl, $params);
        }

        $response = curl_exec($curl);

        curl_close($curl);

        $data = json_decode($response, true);
        if(!is_array($data)) return array();

        return $data;
    }
}

$client = new ChatGPTIniTranslate;
$client->go('api');

```
