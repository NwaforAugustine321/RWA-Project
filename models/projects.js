const db = require('../db');
const axios = require("axios");



const BASE_URL = "https://api.airtable.com/v0/appuDRgBH0PhiEgQd/TRWA%20Projects"
const AIRTABLE_API_KEY = "pat8Pfu1xHdSXQMCT.ab038230da6c9ef1a91b98a48470e4837caec3392adb3f61ba769e515c3432b8"



class Project {



    static async syncProjects() {
        try {
          // Fetch data from Airtable
          const { data } = await axios.get(BASE_URL, {
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
          });
          console.log('Data from Airtable:', data.records);
          // Create an array of promises for all createProject calls
          const createProjectPromises = data.records.map(project =>
            this.createProject(project.fields)
            
          );
      
          // Wait for all promises to resolve
          const projectIds = await Promise.all(createProjectPromises);
      
          console.log(`Inserted projects into the database: ${projectIds.join(', ')}`);
          console.log('Database updated successfully');
        } catch (err) {
          console.error('Error syncing projects', err);
        }
      }
      

      
    // static async createProject(data) {
    //     console.log('Data received in createProject:', data);
      
    //     // Check if the 'Name' field is present in the data object
    //     if (!data || !data.Name) {
    //       console.error('Error: Missing or undefined "Name" field in data');
    //       return; // Don't proceed with the insertion
    //     }
      
    //     const result = await db.query(
    //       `INSERT INTO projects (
    //          name, product_category, secondary_product_category, 
    //          issuer_asset_category, asset_sub_categories, summary, 
    //          launch_status, custodial_non_custodial, private_public_blockchain, 
    //          chain, project_tokens, founded, location, url, twitter
    //        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
    //        RETURNING id`,
    //       [
    //         data.Name,
    //         data.Product_Category,
    //         data.Secondary_Product_Category,
    //         data.Issuer_Asset_Category,
    //         data.Asset_Sub_categories,
    //         data.Summary,
    //         data.Launch_Status,
    //         data.Custodial_Non_Custodial,
    //         data.Private_Public_Blockchain,
    //         data.Chain,
    //         data.Project_Tokens,
    //         data.Founded,
    //         data.Location,
    //         data.URL,
    //         data.Twitter,
    //       ]
    //     );
    //     console.log('SQL Query:', db.query.lastQuery); // Log the SQL query
    //     console.log('Inserted data into the database. Result:', result.rows[0]);
    //     console.log(data.Name)
    //     return result.rows[0].id;
    //   }
    // static async createProject(data) {
    //     console.log('Data received in createProject:', data);
    
    //     // Check if the 'Name' field is present in the data object
    //     if (!data || !data.Name) {
    //         console.error('Error: Missing or undefined "Name" field in data');
    //         return; // Don't proceed with the insertion
    //     }
    
    //     const queryString = `INSERT INTO projects (
    //        name, product_category, secondary_product_category, 
    //        issuer_asset_category, asset_sub_categories, summary, 
    //        launch_status, custodial_non_custodial, private_public_blockchain, 
    //        chain, project_tokens, founded, location, assets_regions, stats,
    //        url, twitter, discord, date_added
    //      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
    //      RETURNING id`;
    
    //     const result = await db.query(queryString, [
    //         data.Name,
    //         data.Product_Category,
    //         data.Secondary_Product_Category,
    //         data.Issuer_Asset_Category,
    //         data.Asset_Sub_categories,
    //         data.Summary,
    //         data.Launch_Status,
    //         data.Custodial_Non_Custodial,
    //         data.Private_Public_Blockchain,
    //         data.Chain,
    //         data.Project_Tokens,
    //         data.Founded,
    //         data.Location,
    //         data.Assets_Regions,
    //         data.Stats,
    //         data.URL,
    //         data.Twitter,
    //         data.Discord,
    //         new Date(), // Assuming date_added is a date field
    //     ]);
    
    //     console.log('SQL Query:', queryString); // Log the SQL query
    //     console.log('Inserted data into the database. Result:', result.rows[0]);
    //     console.log(data.Name);
    //     return result.rows[0].id;
    // }
    
    static async createProject(data) {
        console.log('Data received in createProject:', data);
    
        // Check if the 'Name' field is present in the data object
        if (!data || !data.Name) {
            console.error('Error: Missing or undefined "Name" field in data');
            return; // Don't proceed with the insertion
        }
    
        // Convert array fields to appropriate format
        const productCategory = Array.isArray(data['Product Category']) ? data['Product Category'][0] : data['Product Category'];
        const assetSubCategories = Array.isArray(data['Asset Sub-categories']) ? data['Asset Sub-categories'].join(', ') : data['Asset Sub-categories'];
        const launchStatus = Array.isArray(data['Launch status']) ? data['Launch status'][0] : data['Launch status'];
        const custodialNonCustodial = Array.isArray(data['Custodial/Non-custodial']) ? data['Custodial/Non-custodial'][0] : data['Custodial/Non-custodial'];
        const privatePublicBlockchain = Array.isArray(data['Private/public blockchain']) ? data['Private/public blockchain'][0] : data['Private/public blockchain'];
        const chain = Array.isArray(data['Chain']) ? data['Chain'][0] : data['Chain'];
        const issuerAssetCategory = Array.isArray(data['Issuer/Asset Category']) ? data['Issuer/Asset Category'][0] : data['Issuer/Asset Category'];
    
        const queryString = `INSERT INTO projects (
           name, product_category, secondary_product_category, 
           issuer_asset_category, asset_sub_categories, summary, 
           launch_status, custodial_non_custodial, private_public_blockchain, 
           chain, project_tokens, founded, location, assets_regions, stats,
           url, twitter, discord, date_added
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
         RETURNING id`;

         await db.query('COMMIT');

    
        const result = await db.query(queryString, [
            data.Name,
            productCategory,
            data.Secondary_Product_Category,
            issuerAssetCategory,
            assetSubCategories,
            data.Summary,
            launchStatus,
            custodialNonCustodial,
            privatePublicBlockchain,
            chain,
            data.Project_Tokens,
            data.Founded,
            data.Location,
            data.Assets_Regions,
            data.Stats,
            data.URL,
            data.Twitter,
            data.Discord,
            new Date(), // Assuming date_added is a date field
        ]);
    
        console.log('SQL Query:', queryString); // Log the SQL query
        console.log('Inserted data into the database. Result:', result.rows[0]);
        console.log(data.Name);
        return result.rows[0].id;
    }
    

  static async updateProjectById(id, data) {
    await db.query(
      `UPDATE projects 
       SET 
         name = $1, 
         product_category = $2, 
         secondary_product_category = $3, 
         issuer_asset_category = $4, 
         asset_sub_category = $5, 
         summary = $6, 
         launch_status = $7, 
         custodial_non_custodial = $8, 
         private_public_blockchain = $9, 
         chain = $10, 
         project_tokens = $11, 
         founded = $12, 
         location = $13, 
         url = $14, 
         twitter = $15 
       WHERE id = $16`,
      [
        data.name,
        data.product_category,
        data.secondary_product_category,
        data.issuer_asset_category,
        data.asset_sub_category,
        data.summary,
        data.launch_status,
        data.custodial_non_custodial,
        data.private_public_blockchain,
        data.chain,
        data.project_tokens,
        data.founded,
        data.location,
        data.url,
        data.twitter,
        id,
      ]
    );
  }

  static async deleteProjectById(id) {
    await db.query('DELETE FROM projects WHERE id = $1', [id]);
  }

  // Add more methods as needed...
  static async getProjectByName(name) {
    const result = await db.query('SELECT * FROM projects WHERE name = $1', [name]);
    return result.rows[0];
  }

  static async getProjectsByProductCategory(productCategory) {
    const result = await db.query('SELECT * FROM projects WHERE product_category = $1', [productCategory]);
    return result.rows;
  }

  static async getProjectsByChain(chain) {
    const result = await db.query('SELECT * FROM projects WHERE chain = $1', [chain]);
    return result.rows;
  }

}

module.exports = Project;
