pragma solidity ^0.4.24;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
	mapping (uint => address) stu;
	//综测分数
	mapping (address => uint) balances;
	//公益时
	mapping (address => uint) welfare;
	//名字
	mapping (address => string) name;
	//学号
	mapping (address => string) id;

	//活动名
	mapping (uint => string) activityName;
	//活动详情
	mapping (uint => string) activityDetail;
	//活动可获得加分
	mapping (uint => uint) activityBonus;
	//活动可获得公益时
	mapping (uint => uint) activityWelfare;
	//活动状态
	mapping (uint => bool) activityState;
	//参与人数
	mapping (uint => uint) activityCount;
	//参与者
	mapping (uint => mapping(uint => address)) attenders;

	//加分项
	mapping (uint => string) applyName;
	//申请加分
	mapping (uint => uint) applyB;
	//申请公益时
	mapping (uint => uint) applyWelfare;
	//申请状态
	mapping (uint => bool) applyState;
	//申请者
	mapping (uint => address) applyer;

	uint student_count;
	uint activity_count;
	uint apply_count;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() public {
		apply_count=0;
		student_count=0;
		activity_count=0;
		balances[tx.origin] = 10000;
		welfare[tx.origin] = 10000;
	}

	function attendActivity(uint no) public {
		uint i = activityCount[no];
		attenders[no][i] = msg.sender;
		activityCount[no]++;
	}

	function stopActivity(uint no) public {
        activityState[no]=false;
        //加分
        for(uint i=0;i<activityCount[no];i++)
        {
            balances[attenders[no][i]]+=activityBonus[no];
						welfare[attenders[no][i]]+=activityWelfare[no];
        }
    }

	function apply(string _name,uint _bonus,uint _welfare) public {
		applyName[apply_count] = _name;
		applyB[apply_count] = _bonus;
		applyWelfare[apply_count] = _welfare;
		applyState[apply_count] = false;
		applyer[apply_count] = msg.sender;
		apply_count++;
	}

	function permitBonus(uint no) public {
		applyState[no] = true;
		require(applyState[no]);
		balances[applyer[no]]+=applyB[no];
		welfare[applyer[no]]+=applyWelfare[no];
	}

	function addStudent(string _name,string _id,address add) public {
		balances[add] = 0;
		welfare[add] = 0;
		name[add] = _name;
		id[add] = _id;
		stu[student_count] = add;
		student_count++;
	}

	function addActivity(string _name,string _detail,uint _bonus,uint _welfare) public {
		activityName[activity_count] = _name;
		activityDetail[activity_count] = _detail;
		activityBonus[activity_count] = _bonus;
		activityWelfare[activity_count] = _welfare;
		activityState[activity_count] = true;
		activityCount[activity_count] = 0;
		activity_count++;
	}

	function sendWelfare(address receiver, uint amount) public {
		welfare[receiver] += amount;
		welfare[msg.sender] -= amount;
		//emit Transfer(msg.sender, receiver, amount);
		//return true;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	/*function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}*/

	function getBalance(uint add) public view returns(uint) {
		return balances[stu[add]];
	}

	function getWelfare(uint add) public view returns(uint) {
		return welfare[stu[add]];
	}

	function getStuCount() public view returns(uint) {
		return student_count;
	}

	function getActivityCount() public view returns(uint) {
		return activity_count;
	}

	function getApplyCount() public view returns(uint) {
		return apply_count;
	}

	function getStudent(uint n) public view returns(address){
		return stu[n];
	}

	function getId(uint add) public view returns(string) {
		return id[stu[add]];
	}

	function getName(uint add) public view returns(string) {
		return name[stu[add]];
	}

	function getNamebyAddress(address add) public view returns(string) {
		return name[add];
	}

	function getActivityName(uint n) public view returns(string) {
		return activityName[n];
	}

	function getActivityDetail(uint n) public view returns(string) {
		return activityDetail[n];
	}

	function getActivityBonus(uint n) public view returns(uint) {
		return activityBonus[n];
	}

	function getActivityWelfare(uint n) public view returns(uint) {
		return activityWelfare[n];
	}

	function getActivityState(uint n) public view returns(bool) {
		return activityState[n];
	}

	function getApplyName(uint n) public view returns(string) {
		return applyName[n];
	}

	function getApplyBonus(uint n) public view returns(uint) {
		return applyB[n];
	}

	function getApplyWelfare(uint n) public view returns(uint) {
		return applyWelfare[n];
	}

	function getApplyState(uint n) public view returns(bool) {
		return applyState[n];
	}

	function getApplyer(uint n) public view returns(string) {
		return name[applyer[n]];
	}
}
