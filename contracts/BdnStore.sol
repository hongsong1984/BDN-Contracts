pragma solidity ^0.4.18;

<<<<<<< HEAD
contract BDNStore {

=======
contract BdnStore {
	
>>>>>>> 881256bd0093caafa6dca6452eaa3dc55bf1981a
	uint public dataIndex;
	mapping (address => mapping(uint => Data)) stores;
	mapping (uint => address) dataIdInStore;

	struct Data {
		uint id;
		uint uuid;
		address ueid;
		string dataType;
<<<<<<< HEAD
		string filePath;
=======
		string fileName;
		string filePath;
		string parentIndustry;
		string childIndustry;
		string brandName;
>>>>>>> 881256bd0093caafa6dca6452eaa3dc55bf1981a
		uint totlaCount;
		uint createTime;
	}

<<<<<<< HEAD
	function BDNStore() public {
		dataIndex = 0;
	}

	function addDataToStore(uint _uuid, address _ueid, string _dataType, string _filePath, uint _totalCount,uint _createTime) public {
		dataIndex += 1;
		Data memory data = Data(dataIndex, _uuid, _ueid, _dataType, _filePath, _totalCount, _createTime);
=======
	function BdnStore() public {
		dataIndex = 0;		
	}

	function addDataToStore(uint _uuid, address _ueid, string _dataType, string _fileName, string _filePath, 
		string _parentIndustry, string _childIndustry, string _brandName, uint _totalCount,uint _createTime) public {
		dataIndex += 1;
		Data memory data = Data(dataIndex, _uuid, _ueid, _dataType, _fileName, _filePath, _parentIndustry, _childIndustry, _brandName, _totalCount, _createTime);
>>>>>>> 881256bd0093caafa6dca6452eaa3dc55bf1981a
		stores[_ueid][dataIndex] = data;
		dataIdInStore[dataIndex] = _ueid;
	}

<<<<<<< HEAD
	function getData(uint _dataId) view public returns (uint,uint,address,string,string,uint,uint) {
		Data memory data = stores[dataIdInStore[_dataId]][_dataId];
		return (data.id, data.uuid, data.ueid, data.dataType, data.filePath, data.totlaCount, data.createTime);
	}

}
=======
	function getData(uint _dataId) view public returns (uint,uint,address,string,string,string,string,string,string,uint,uint) {
		Data memory data = stores[dataIdInStore[_dataId]][_dataId];
		return (data.id, data.uuid, data.ueid, data.dataType, data.fileName, data.filePath, data.parentIndustry, data.childIndustry, data.brandName, data.totlaCount, data.createTime);
	}
	
}
>>>>>>> 881256bd0093caafa6dca6452eaa3dc55bf1981a
