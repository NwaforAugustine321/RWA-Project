
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    product_category VARCHAR(255),
    secondary_product_category VARCHAR(255),
    issuer_asset_category VARCHAR(255),
    asset_sub_categories VARCHAR(255),
    summary TEXT,
    launch_status VARCHAR(50),
    custodial_non_custodial VARCHAR(50),
    private_public_blockchain VARCHAR(50),
    chain VARCHAR(50),
    project_tokens VARCHAR(255),
    founded VARCHAR(255),
    location VARCHAR(255),
    assets_regions VARCHAR(255),
    stats VARCHAR(255),
    url VARCHAR(255),
    twitter VARCHAR(255),
    discord VARCHAR(255),
    date_added DATE
);
