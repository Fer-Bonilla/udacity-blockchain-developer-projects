pragma solidity ^0.4.24;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 { 

    struct Coordinates {
        string dec;      
        string mag;        
        string cent;
    }

    struct Star { 
        string name; 
        string story;
        Coordinates coordinates;        
    }
  
    uint256 public tokenheigth;

    mapping(uint256 => Star) public tokenIdToStarInfo; 
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => bool) public starHashMap;

    function createStar(string _name, string _story, string _dec, string _mag, string _cent) public { 

        tokenheigth++;
        uint256 _tokenId = tokenheigth;
        
        require(keccak256(abi.encodePacked(tokenIdToStarInfo[tokenheigth].coordinates.dec)) == keccak256(""));

        require(keccak256(abi.encodePacked(_dec)) != keccak256(""));
        require(keccak256(abi.encodePacked(_mag)) != keccak256(""));
        require(keccak256(abi.encodePacked(_cent)) != keccak256(""));
        require(_tokenId != 0);
        require(!checkIfStarExist(_dec, _mag, _cent));

        Coordinates memory coordinates = Coordinates(_dec, _mag, _cent);
        Star memory newStar = Star(_name, _story, coordinates);

        tokenIdToStarInfo[_tokenId] = newStar;

        starHashMap[keccak256(abi.encodePacked(_dec, _mag, _cent))] = true;

        _mint(msg.sender, _tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);
        
        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0);
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }

    function checkIfStarExist(string _dec, string _mag, string _cent) public view returns(bool) {
        return starHashMap[generateStarHash(_dec, _mag, _cent)];
    }

    function mint(uint256 _tokenId) public {
        super._mint(msg.sender, _tokenId);
    }

    function tokenIdToStarInfo(uint256 _tokenId) public view returns (string, string, string, string, string){
        return (
            tokenIdToStarInfo[_tokenId].name,
            tokenIdToStarInfo[_tokenId].story,
            tokenIdToStarInfo[_tokenId].coordinates.dec,
            tokenIdToStarInfo[_tokenId].coordinates.mag,
            tokenIdToStarInfo[_tokenId].coordinates.cent
        );
    }

    function generateStarHash(string _dec, string _mag, string _cent) private pure returns(bytes32) {
        return keccak256(abi.encodePacked(_dec, _mag, _cent));
    }

}