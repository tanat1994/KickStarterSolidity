pragma solidity ^0.4.17;

contract CampaignFactory { //Use this contract to create campaign for us
    address[] public deployedCampaigns;

    function createCampaign (uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns () public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCounts; //number who vote yes
        mapping(address=>bool) approvals;
    }

    Request[] public requests;  //These global variable is storage
    address public manager;
    uint public minimumContribution;
    //address[] public approvers; //Use a lot of GAS to loop
    mapping(address=>bool) public approvers;
    uint approversCount;

    modifier restricted () {
        require (msg.sender == manager);
        _;
    }

    function Campaign (uint minimum, address creator) public { //Parameter variable is memory data(temporary)
        // manager = msg.sender;
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute () public payable {
        require (msg.value > minimumContribution);
        //approvers.push(msg.sender); //In this contract we're not working with approvers anymore
        approvers[msg.sender] = true;
        //Basicly we can't count the number of approvers in mapping so we need to define some variable to count it
        approversCount++;
    }

    function createRequest (string description, uint value, address recipient) public restricted{
        Request memory newRequest = Request ({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCounts: 0
        });

        requests.push(newRequest);
    }

    function approveRequest (uint index) public {
        Request storage request = requests[index]; //storage var to point to the same value

        //TODO : 1. Check if the user is donate to the Campaign
        require(approvers[msg.sender]);
        //TODO : 2. Check if the user is not voting twice
        //require(!requests[index].approvals[msg.sender]);
        require(!request.approvals[msg.sender]); //Short form after define request instance

        //requests[index].approvals[msg.sender] = true;
        request.approvals[msg.sender] = true; //Short form
        //requests[index].approvalCounts++;
        request.approvalCounts++; //Short form
    }

    function finalizeRequest (uint index) public {
        Request storage request = requests[index];
        require(request.approvalCounts > (approversCount/2));
        require(!request.complete); //Require always check for true value if the request is completed check to false, but if the request is not complete check to true

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
