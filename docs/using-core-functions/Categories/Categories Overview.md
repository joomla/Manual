Several of the Joomla core components implement categories to enable records which are similar in some way to be grouped together. If you're developing a component then you can easily incorporate category functionality into your component.

It's helpful initially to consider how categories are stored and linked to in the database. The diagram below takes as an example categories associated with `com_contact`.  The blue rectangles relate to database tables, the yellow ones to Joomla classes. The red bars are meant to indicate records in the Categories table.

![Categories](https://github.com/robbiejackson/Manual/assets/5058681/bc29722e-38f8-499b-8e35-301847fb1df8)

The Joomla Categories table is split into "partitions", one partition for each component which uses categories. (Here "partitions" is used in a loose sense, not related to the technical term "database partition" for example). 

Within each partition the category records are held within a tree structure, but always associated with the same component – for example, you can't have a `com_content` category which has as a parent a `com_contact` category. This is indicated in the diagram by the arrows on the left pointing back to the same partition. At the root of the tree is a single system root node, which is the parent of all the top-level category records of the components. 

If a Joomla component supports the use of categories, then the component's database table will have a column which holds the category id. So each component record (at least, each record which is associated with a category) holds the id of the corresponding category record (as a foreign key). All the category attributes are held in the category record within the Categories table.

This is shown in the diagram using the example of `com_contact`. The one-to-many link from the Categories table partition to the Contact Details table indicates that a category record can be associated with many contact records. 

There are 2 Joomla classes (shown in yellow) which are related to categories, and which provide APIs for accessing category data: 
1. Categories – This relates to the partition within the Categories table. The Categories object which you instantiate needs to know which partition of the categories table you want to access, so in creating it you need to specify the associated component. 
2. CategoryNode – This relates to an individual category record. Once you have the Categories object you can get access to the CategoryNode objects within that partition.

In your code you can access the category data for several components, through creating several Categories instances, one for each component/partition. 
