CREATE TABLE ERC721NFTCollections(
    Id int identity(1,1) primary key,
    NFTCollectionAddress nvarchar(100) unique,
    CollectionName  nvarchar(500),
    Symbol nvarchar(15),
    TotalSupply int not null,
    Deployer varchar(100) ,
    DeploymentTx varchar(300),
    BlockNumber int,
)