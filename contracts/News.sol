pragma solidity ^0.4.2;

contract News {
	string private latest;

	constructor() public {
		latest = "Hurra! Die News werden angezeigt.";
	}

	function getLatest() public view returns (string) {
		return latest;
	}

	function setLatest(string news) public {
		latest = news;
	}
}
