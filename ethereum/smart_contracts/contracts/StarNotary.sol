pragma solidity ^0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

/// @title StarNotary, Stars registration with Ethereum smart contracts
/// @notice Use this contracts only for basic functions
/// @dev Tested Contracts
contract StarNotary is ERC721 { 

    /// Struct Coordinates represent star coordinates
    /// @param dec
    /// @param mag
    /// @param cent
    struct Coordinates {
        string dec;      
        string mag;        
        string cent;
    }

    /// Struct Star
    /// @param name
    /// @param story
    /// @param coordinates
    struct Star { 
        string name; 
        string story;
        Coordinates coordinates;        
    }
  
    /// @notice
    uint256 public tokenheigth;

    /// @notice
    mapping(uint256 => Star) public tokenIdToStarInfo; 
    /// @notice
    mapping(uint256 => uint256) public starsForSale;
    /// @notice
    mapping(bytes32 => bool) public starHashMap;

    /// @notice Function for stars creation
    /// @dev 
    /// param {_name}
    /// param {_story}
    /// param {_dec}
    /// param {_mag}
    /// param {_cent}
    /// @return Star creation confirmation
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

    /// @notice Publish the star for sale
    /// @dev
    /// @param _tokenId
    /// param {_price}
    /// @return none
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);
        starsForSale[_tokenId] = _price;
    }

    /// @notice Buy star
    /// @dev
    /// @param _tokenId
    /// @return transfer cofirmation
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

    /// @notice Check for Star existence
    /// @dev
    /// param {_dec}
    /// param {_mag}
    /// param {_cent}
    /// @return starHashMap
    function checkIfStarExist(string _dec, string _mag, string _cent) public view returns(bool) {
        return starHashMap[keccak256(abi.encodePacked(_dec, _mag, _cent))];
    }

    /// @notice Ends the token
    /// @dev
    /// @param _tokenId
    /// @return mint verification
    function mint(uint256 _tokenId) public {
        super._mint(msg.sender, _tokenId);
    }

    /// @notice Get the Star Info by Token Id
    /// @dev
    /// @param _tokenId
    /// @return Star Info
    function tokenIdToStarInfo(uint256 _tokenId) public view returns (string, string, string, string, string){
        return (
            tokenIdToStarInfo[_tokenId].name,
            tokenIdToStarInfo[_tokenId].story,
            tokenIdToStarInfo[_tokenId].coordinates.dec,
            tokenIdToStarInfo[_tokenId].coordinates.mag,
            tokenIdToStarInfo[_tokenId].coordinates.cent
        );
    }
}