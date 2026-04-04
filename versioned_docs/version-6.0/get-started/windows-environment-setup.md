# Windows Environment Setup for Joomla Development

This guide will help you set up a complete Joomla development environment on Windows. While the official GitHub instructions might suggest using LAMPP (primarily a Linux stack), this document provides a Windows-specific approach using **XAMPP**.

---

## Prerequisites Overview
Before we begin, understand the correct installation order:
1. **XAMPP** (provides PHP, Apache, MySQL)
2. **Composer** (PHP dependency manager)
3. **Node.js/npm** (JavaScript package manager)

---

## Step 1: Install XAMPP

1. Download XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)
2. Run the installer and follow the installation wizard
3. Choose the default installation path (`C:\xampp`) or customize as needed

> **Important:** Install XAMPP **before** installing Composer. If you install Composer first, you'll encounter an issue where the PHP path field is disabled and cannot be modified, preventing completion of the installation.

---

## Step 2: Install Composer

1. After XAMPP is successfully installed, download Composer from [https://getcomposer.org/](https://getcomposer.org/)
2. Run the Composer installer
3. The PHP path should now be **automatically detected** from your XAMPP installation
4. Complete the installation following the wizard prompts

---

## Step 3: Start XAMPP Services

1. Open the **XAMPP Control Panel** (from Start Menu or desktop shortcut)
2. Click the **Start** button for **Apache**
3. Click the **Start** button for **MySQL**

You should see the status indicators turn green for both services.

---

## Step 4: Enable Required PHP Extensions

If you run the Joomla setup commands without preparation, you might encounter errors like:
> *"Root composer.json requires PHP extension ext-gd * but it is missing from your system. Install or enable PHP's gd extension"*

To prevent this, enable the required extensions:

1. Open **XAMPP Control Panel**
2. Click the **"Config"** button for Apache
3. Select **"php.ini"** from the dropdown menu
4. In the php.ini file that opens, press **Ctrl + F** to search for the following extensions:
   - `extension=gd` or `extension=php_gd2.dll`
   - `extension=ldap` or `extension=php_ldap.dll`
   - `extension=sodium` or `extension=php_sodium.dll`
5. For each line you find, check if there is a semicolon **";"** at the beginning (e.g., `;extension=gd`)
6. If a semicolon exists, **remove it** to uncomment the extension
7. **Save** the php.ini file
8. **Restart both Apache and MySQL** services from the XAMPP Control Panel for the changes to take effect

---

## Step 5: Create a Symbolic Link (Recommended)

Instead of placing your project directly inside the XAMPP `htdocs` folder, create a symbolic link. This allows you to keep your project files in your preferred location (like your Git workspace) while making them accessible to XAMPP.

### Open PowerShell as Administrator:
```powershell
# Press Windows + X, then select "PowerShell (Admin)" or "Terminal (Admin)"
```

### Create the Symbolic Link:
Run the following command, replacing the paths with your actual project location:

```powershell
New-Item -ItemType SymbolicLink -Path "C:\xampp\htdocs\joomla-cms" -Target "D:\your\actual\project\path"
```

**Example:**
```powershell
New-Item -ItemType SymbolicLink -Path "C:\xampp\htdocs\joomla-cms" -Target "D:\Program Files\mygit\joomla-cms"
```

- The **-Path** is where the symbolic link will be created (inside XAMPP's htdocs folder)
- The **-Target** is the actual location of your Joomla project files

---

## Step 6: Clone the Joomla Repository

If you haven't already cloned the Joomla repository, do so now:

```powershell
# Navigate to your desired projects folder
cd D:\your\preferred\location

# Clone the Joomla repository
git clone https://github.com/joomla/joomla-cms.git

# Navigate into the cloned directory
cd joomla-cms
```

---

## Step 7: Run the Setup Commands

Now navigate to your project directory and run the installation commands:

```powershell
# Navigate to your Joomla project (if not already there)
cd D:\your\actual\project\path

# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm ci
```

> **Note about npm errors:** When running `npm ci`, you might see errors like:
> *"failed to download resource X from Y"*
> 
> Don't panic if you see these messages. The system will automatically try to download any failed resources from alternative sources.

---

## Step 8: Access Your Joomla Site

Once everything is set up, open your web browser and navigate to:

```
http://localhost/joomla-cms
```

> **Note:** The URL path (`joomla-cms` in this example) should match the name you used when creating the symbolic link. If you used a different name, adjust the URL accordingly.

---

## Step 9: Configure Joomla

1. You should see the Joomla installation wizard
2. Follow the on-screen instructions to complete the configuration:
   - Select your language
   - Configure database settings (use MySQL with credentials: root/[blank password] for default XAMPP setup)
   - Set up your site name and admin account
3. Complete the installation

---

## Troubleshooting Tips

### If you encounter permission issues:
```powershell
# Ensure your project folder has proper permissions
# You may need to run PowerShell as Administrator
```

### If Apache fails to start:
- Check if another program (like Skype or IIS) is using port 80 or 443
- In XAMPP Control Panel, click Apache → Config → httpd.conf and try changing the port

### If MySQL fails to start:
- Check if another MySQL instance is running
- Ensure no other service is using port 3306

### If extensions still show as missing after enabling:
- Double-check that you saved php.ini
- Confirm you restarted Apache
- Verify the extension files exist in `C:\xampp\php\ext\`

---

## Next Steps

Your Joomla development environment is now ready! You can:
- Start contributing to Joomla core
- Create extensions (components, modules, plugins)
- Test patches and fixes
- Build Joomla websites locally

For more information, refer to the [Joomla! Developer Documentation](https://manual.joomla.org/docs/get-started/).