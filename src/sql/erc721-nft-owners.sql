CREATE TABLE ERC721NFTOwners(
    Id int identity(1,1) primary key not null,
    NftContractAddress nvarchar(1000) not null,
    TokenId int not null,
    Owner nvarchar(1000) not null

)