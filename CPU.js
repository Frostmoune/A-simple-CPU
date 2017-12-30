var isStart=0;
var preShow=2,Show=2,Time=500;
var CLK=1,Reset=0;
var curPC=0;
var NextPC=0;
var Instructions=[];
var OpCode={};
var Rs={};
var Rt={};
var Rd={};
var Immediate={};
var Sa={};
var Address={};
var InsReg="";
var State=0;
var PCWre=1,ALUSrcA=0,ALUSrcB=0,DBDataSrc=0,RegWre=1,InsMemRW=0,RD=1,WR=1,
    RegDst=2,ExtSel=0,PCSrc=0,ALUOp=0,IRWre=1,WrRegDSrc=1,IsHalt=0;
var ControlUnitShow={};
var WriteReg=0,WriteData=0,ReadReg1=0,ReadReg2=0,Data1=0,Data2=0,ReadData1=0,ReadData2=0;
var PC_4=0,B_PC=0,J_PC=0;
var Registers=[];
var ExtOut=0;
var ALUA=0,ALUB=0;
var tempResult=0,Result=0,Zero=0,Sign=0;
var Datas=[];
var DataOut=0,TempData=0,Data=0;

function DeleteLi(){
    var left=$("#left");
    left.css("font-size","20px");
    var li=$("#left>li");
    li.remove();
    return;
}

function PC(){
    if(Reset==0)curPC=0;
    else {
        if(CLK==1){
            if(PCWre){
                curPC=NextPC;
            }
        }
    }
}

function PC_Show(){
    if(preShow!=1)DeleteLi();
    var left=$("#left");
    var string="curPC:"+curPC.toString(16)+"\n";
    var li=left.find('#PCLi1');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="PCLi1";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="NextPC:"+NextPC.toString(16)+"\n";
    li=left.find('#PCLi2');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="PCLi2";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
}

function CLK_Show(){
    var right=$("#right");
    var string="CLK:"+CLK.toString(16)+"\n";
    var li=right.find('#CLKLi');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="CLKLi";
        right.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="Reset:"+Reset.toString(16)+"\n";
    li=right.find('#ResetLi');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="ResetLi";
        right.append(li);
    }
    else{
        li[0].innerText=string;
    }
    if(isStart){
        string="State:"+State.toString(16)+"\n";
        li=right.find('#StateLi');
        if(li.length<=0){
            li=document.createElement('li');
            li.innerText=string;
            li.id="StateLi";
            right.append(li);
        }
        else{
            li[0].innerText=string;
        }
    }
}

function Negative_to_String(string,length){
    if(string==undefined)return undefined;
    var num=parseInt(string,2);
    var nownum=1<<(length+1)-1;
    if(string[0]=='1'){
        num-=nownum;
    }
    return num.toString(16);
}

function Negative_to_Number(string,length){
    if(string==undefined)return undefined;
    var num=parseInt(string,2);
    var nownum=1<<(length+1)-1;
    if(string[0]=='1'){
        num-=nownum;
    }
    return num;
}

function Instruction_Show(i){
    if(preShow!=2)DeleteLi();
    if(isStart){
        var left=$("#left");
        var string,li,listring;
        var nowins=Instructions[i];
        if(nowins==undefined){
            var li=$("#left>li");
            li.remove();
            return;
        }
        string=nowins;
        listring='#InstructionLi';
        var li=left.find(listring);
        if(li.length<=0){
            li=document.createElement('li');
            li.innerText=string;
            li.id=listring.substring(1);
            left.append(li);
        }
        else{
            li[0].innerText=string;
        }
        string="Op:"+OpCode[nowins.trim()]+"\n";
        listring='#OpLi';
        var li=left.find(listring);
        if(OpCode[nowins.trim()]!=undefined){
            if(li.length<=0){
                li=document.createElement('li');
                li.innerText=string;
                li.id=listring.substring(1);
                left.append(li);
            }
            else{
                li[0].innerText=string;
            }
        }
        else{
            li.remove();
        }
        string="Rs:"+parseInt(Rs[nowins.trim()],2).toString(16)+"\n";
        listring='#RsLi';
        var li=left.find(listring);
        if(Rs[nowins.trim()]!=undefined){
            if(li.length<=0){
                li=document.createElement('li');
                li.innerText=string;
                li.id=listring.substring(1);
                left.append(li);
            }
            else{
                li[0].innerText=string;
            }
        }
        else{
            li.remove();
        }
        string="Rt:"+parseInt(Rt[nowins.trim()],2).toString(16)+"\n";
        listring='#RtLi';
        var li=left.find(listring);
        if(Rt[nowins.trim()]!=undefined){
            if(li.length<=0){
                li=document.createElement('li');
                li.innerText=string;
                li.id=listring.substring(1);
                left.append(li);
            }
            else{
                li[0].innerText=string;
            }
        }
        else{
            if(li.length>0)li.remove();
        }
        string="Rd:"+parseInt(Rd[nowins.trim()],2).toString(16)+"\n";
        listring='#RdLi';
        var li=left.find(listring);
        if(Rd[nowins.trim()]!=undefined){
            if(li.length<=0){
                li=document.createElement('li');
                li.innerText=string;
                li.id=listring.substring(1);
                left.append(li);
            }
            else{
                li[0].innerText=string;
            }
        }
        else{
            li.remove();
        }
        string="Sa:"+parseInt(Sa[nowins.trim()],2).toString(16)+"\n";
        listring='#SaLi';
        var li=left.find(listring);
        if(Sa[nowins.trim()]!=undefined){
            if(li.length<=0){
                li=document.createElement('li');
                li.innerText=string;
                li.id=listring.substring(1);
                left.append(li);
            }
            else{
                li[0].innerText=string;
            }
        }
        else{
            li.remove();
        }
        string="Immediate:"+Negative_to_String(Immediate[nowins.trim()],16)+"\n";
        listring='#ImmediateLi';
        var li=left.find(listring);
        if(Immediate[nowins.trim()]!=undefined){
            if(li.length<=0){
                li=document.createElement('li');
                li.innerText=string;
                li.id=listring.substring(1);
                left.append(li);
            }
            else{
                li[0].innerText=string;
            }
        }
        else{
            li.remove();
        }
        string="Address:"+parseInt(Address[nowins.trim()],2).toString(16)+"\n";
        listring='#AddressLi';
        var li=left.find(listring);
        if(Address[nowins.trim()]!=undefined){
            if(li.length<=0){
                li=document.createElement('li');
                li.innerText=string;
                li.id=listring.substring(1);
                left.append(li);
            }
            else{
                li[0].innerText=string;
            }
        }
        else{
            li.remove();
        }
    }
    else {
        if(Instructions.length<=0){
            DeleteLi();
            return;
        }
        var left=$("#left");
        var string,li,listring;
        for(var i=0;i<Instructions.length;++i){
            listring="#Instruction"+i.toString()+"Li";
            string=Instructions[i];
            li=left.find(listring);
            if(li.length<=0){
                li=document.createElement('li');
                var eraseid="erase"+i.toString();
                var nowstring="<button class=\"erase\" id=\""+eraseid+"\"></button>";
                li.innerHTML=nowstring;
                li.innerHTML+="\t<span id=span_erase"+i.toString()+"></span>";
                li.id=listring.substring(1);
                left.append(li);
                document.getElementById("span_erase"+i.toString()).innerText=string;
                document.getElementById(eraseid).onclick=function(){
                    var tempid=this.id;
                    Delete_one_instruction(tempid.substring(5,tempid.length));
                };
            }
            else{
                document.getElementById("span_erase"+i.toString()).innerText=string;
            }
        }
    }
}

function Delete_one_instruction(id){
    var nowins=Instructions[id];
    Instructions.splice(id,1);
    if(Rs[nowins]!=undefined)delete Rs[nowins];
    if(Rt[nowins]!=undefined)delete Rt[nowins];
    if(Rd[nowins]!=undefined)delete Rd[nowins];
    if(Immediate[nowins]!=undefined)delete Immediate[nowins];
    if(Address[nowins]!=undefined)delete Address[nowins];
    if(Sa[nowins]!=undefined)delete Sa[nowins];
    for(var i=0;i<Instructions.length;++i){
        document.getElementById("span_erase"+i.toString()).innerText=Instructions[i];
    }
    $("#Instruction"+Instructions.length.toString()+"Li").remove();
}

function String_to_binary(string,length){
    var nownum=parseInt(string);
    var flag=0;
    if(nownum<0)flag=1;
    nownum=nownum.toString(2);
    if(flag)nownum=nownum.substring(1,nownum.length);
    var res="";
    for(var i=0;i<length-nownum.length;i++){
        if(res.length==0){
            if(flag)res="1";
            else res="0";
        }
        else {
            if(flag)res+="1";
            else res+="0";
        }
    }
    res+=nownum;
    return res;
}

function R_convert(string){
    var i=0,j=0;
    i=string.indexOf("$");
    j=string.indexOf(",",i);
    Rd[string]=String_to_binary(string.substring(i+1,j),5);
    i=string.indexOf("$",j);
    j=string.indexOf(",",i);
    Rs[string]=String_to_binary(string.substring(i+1,j),5);
    i=string.indexOf("$",j);
    j=string.length;
    Rt[string]=String_to_binary(string.substring(i+1,j),5);
}

function I_convert(string){
    var i=0,j=0;
    i=string.indexOf("$");
    j=string.indexOf(",",i);
    Rt[string]=String_to_binary(string.substring(i+1,j),5);
    i=string.indexOf("$",j);
    j=string.indexOf(",",i);
    Rs[string]=String_to_binary(string.substring(i+1,j),5);
    i=j;
    j=string.length;
    Immediate[string]=String_to_binary(string.substring(i+1,j),16);
}

function B_convert(string){
    var i=0,j=0;
    i=string.indexOf("$");
    j=string.indexOf(",",i);
    Rs[string]=String_to_binary(string.substring(i+1,j),5);
    i=string.indexOf("$",j);
    j=string.indexOf(",",i);
    Rt[string]=String_to_binary(string.substring(i+1,j),5);
    i=j;
    j=string.length;
    Immediate[string]=String_to_binary(string.substring(i+1,j),16);
}

function J_convert(string){
    var i=0,j=0;
    i=string.indexOf(" ");
    j=string.length;
    var nowaddress=String_to_binary(string.substring(i+1,j),27);
    nowaddress=nowaddress.substring(0,nowaddress.length-2);
    Address[string]=nowaddress;
}

function W_convert(string){
    var i=0,j=0;
    i=string.indexOf("$");
    j=string.indexOf(",",i);
    Rt[string]=String_to_binary(string.substring(i+1,j),5);
    i=j+1;
    j=string.indexOf("(",i);
    Immediate[string]=String_to_binary(string.substring(i,j),16);
    i=j+1;
    j=string.length;
    Rs[string]=String_to_binary(string.substring(i+1,j),5);
}

function Decode(string){
    var op=string.substring(0,3);
    var i=0,j=0;
    if(op=="add"){
        if(string[3]=='i'){
            OpCode[string]="000010";
            I_convert(string);
        }
        else {
            OpCode[string]="000000";
            R_convert(string);
        }
    }
    else if(op=="sub"){
        OpCode[string]="000001";
        R_convert(string);
    }
    else if(op=="and"){
        if(string[3]=='i'){
            OpCode[string]="010011";
            I_convert(string);
        }
        else {
            OpCode[string]="010000";
            R_convert(string);
        }
    }
    else if(op.substring(0,2)=="or"){
        if(string[2]=='i'){
            OpCode[string]="010100";
            I_convert(string);
        }
        else {
            OpCode[string]="010001";
            R_convert(string);
        }
    }
    else if(op=="xor"){
        if(string[3]=='i'){
            OpCode[string]="010101";
            I_convert(string);
        }
        else {
            OpCode[string]="010010";
            R_convert(string);
        }
    }
    else if(op=="sll"){
        OpCode[string]="011000";
        var i=0,j=0;
        i=string.indexOf("$");
        j=string.indexOf(",",i);
        Rd[string]=String_to_binary(string.substring(i+1,j),5);
        i=string.indexOf("$",j);
        j=string.indexOf(",",i);
        Rt[string]=String_to_binary(string.substring(i+1,j),5);
        i=j;
        j=string.length;
        Sa[string]=String_to_binary(string.substring(i+1,j),5);
    }
    else if(op=="slt"){
        if(string[3]=='i'){
            OpCode[string]="100111";
            I_convert(string);
        }
        else {
            OpCode[string]="100110";
            R_convert(string);
        }
    }
    else if(op=="beq"){
        OpCode[string]="110100";
        B_convert(string);
    }
    else if(op=="bne"){
        OpCode[string]="110101";
        B_convert(string);
    }
    else if(op=="bgt"){
        OpCode[string]="110110";
        var i=0,j=0;
        i=string.indexOf("$");
        j=string.indexOf(",",i);
        Rs[string]=String_to_binary(string.substring(i+1,j),5);
        Rt[string]="00000";
        i=j+1;
        j=string.length;
        Immediate[string]=String_to_binary(string.substring(i,j),16);
    }
    else if(op=="jal"){
        OpCode[string]="111010";
        J_convert(string);
    }
    else if(op.substring(0,2)=="jr"){
        OpCode[string]="111001";
        var i=0,j=0;
        i=string.indexOf("$");
        j=string.length;
        Rs[string]=String_to_binary(string.substring(i+1,j),5);
    }
    else if(op[0]=="j"){
        OpCode[string]="111000";
        J_convert(string);
    }
    else if(op.substring(0,2)=="sw"){
        OpCode[string]="110000";
        W_convert(string);
    }
    else if(op.substring(0,2)=="lw"){
        OpCode[string]="110001";
        W_convert(string);
    }
    else if(op=="hal"){
        OpCode[string]="111111";
    }
    else{
        Instructions.pop();
        alert("Wrong Input!");
    }
}

function Instruction_Register(i){
    if(IRWre==1&&CLK==0){
        InsReg=Instructions[i];
    }
}

function ControlUnit_State(nowins){
    var Op=OpCode[nowins];
    if(Reset==0)State=0;
    else if(CLK==1){
        if(State==0)State=1;
        else if(State==1){
            if((Op=="111000")||(Op=="111001")||(Op=="111010")||(Op=="111111"))State=0;
            else State=2;
        }
        else if(State==2){
            if((Op=="110100")||(Op=="110101")||(Op=="110110"))State=0;
            else if((Op=="110000")||(Op=="110001"))State=4;
            else State=3;
        }
        else if(State==4){
            if(Op=="110000")State=0;
            else State=3;
        }
        else State=0;
    }
}

function ControlUnit_Control(nowins){
    var Op=OpCode[nowins];
    if(State==2&&Op=="011000"){
        ALUSrcA=1;
        ControlUnitShow["ALUSrcA"]=1;
    }
    else {
        ALUSrcA=0;
        ControlUnitShow["ALUSrcA"]=0;
    }
    
    if(State==2){
        if((Op=="000010")||(Op=="010011")||(Op=="010100")||(Op=="010101")||(Op=="100111")||(Op=="110000")||(Op=="110001")){
            ALUSrcB=1;
            ControlUnitShow["ALUSrcB"]=1;
        }
        else {
            ALUSrcB=0;
            ControlUnitShow["ALUSrcB"]=0;
        }
    }
    else {
        ALUSrcB=0;
        ControlUnitShow["ALUSrcB"]=0;
    }
    
    if(State==4&&Op=="110001"){
        DBDataSrc=1;
        ControlUnitShow["DBDataSrc"]=1;
    }
    else {
        DBDataSrc=0;
        ControlUnitShow["DBDataSrc"]=0;
    }

    if(State==4&&Op=="110001"){
        RD=0;
        ControlUnitShow["RD"]=0;
    }
    else {
        RD=1;
        ControlUnitShow["RD"]=1;
    }
    
    if(State==4&&Op=="110000"){
        WR=0;
        ControlUnitShow["WR"]=0;
    }
    else {
        WR=1;
        ControlUnitShow["WR"]=1;
    }
    
    if(State==2){
        if((Op=="000010")||(Op=="110000")||(Op=="110001")||(Op=="110100")||(Op=="110101")||(Op=="110110")){
            ExtSel=1;
            ControlUnitShow["ExtSel"]=1;
        }
        else {
            ExtSel=0;
            ControlUnitShow["ExtSel"]=0;
        }
    }
    else {
        ExtSel=0;
        ControlUnitShow["ExtSel"]=0;
    }
    
    if(State==1&&Op=="111010"){
        RegDst=0;
        ControlUnitShow["RegDst"]=0;
    }
    else if(State==3){
        if((Op=="000010")||(Op=="010011")||(Op=="010100")||(Op=="010101")||(Op=="100111")||(Op=="110001")){
            RegDst=1;
            ControlUnitShow["RegDst"]=1;
        }
        else {
            RegDst=2;
            ControlUnitShow["RegDst"]=2;
        }
    }
    else {
        RegDst=2;
        ControlUnitShow["RegDst"]=2;
    }
         
    if(State==1&&Op=="111010"){
        WrRegDSrc=0;
        ControlUnitShow["WrRegDSrc"]=0;
    }
    else {
        WrRegDSrc=1;
        ControlUnitShow["WrRegDSrc"]=1;
    }
    
    if(State==3){
        RegWre=1;
        ControlUnitShow["RegWre"]=1;
    }
    else if(State==1&&Op=="111010"){
        RegWre=1;
        ControlUnitShow["RegWre"]=1;
    }
    else {
        RegWre=0;
        ControlUnitShow["RegWre"]=0;
    }

    if(State==0){
        IRWre=1;
        ControlUnitShow["IRWre"]=1;
    }
    else {
        IRWre=0;
        ControlUnitShow["IRWre"]=0;
    }
    
    if(State==1){
        if((Op=="111000")||(Op=="111010")){
            PCSrc=3;
            ControlUnitShow["PCSrc"]=3;
        }
        else if(Op=="111001"){
            PCSrc=2;
            ControlUnitShow["PCSrc"]=2;
        }
        else {
            PCSrc=0;
            ControlUnitShow["PCSrc"]=0;
        }
    }
    else if(State==2){
        if((Op=="110100"&&Zero==1)||(Op=="110101"&&Zero==0)||(Op=="110110"&&Zero==0&&Sign==0)){
            PCSrc=1;
            ControlUnitShow["PCSrc"]=1;
        }
        else {
            PCSrc=0;
            ControlUnitShow["PCSrc"]=0;
        }
    }
    else {
        PCSrc=0;
        ControlUnitShow["PCSrc"]=0;
    }
    
    if(Reset==0){
        IsHalt=0;
        ControlUnitShow["IsHalt"]=0;
    }
    else if(Op=="111111"){
        IsHalt=1;
        ControlUnitShow["IsHalt"]=1;
    }
    else {
        IsHalt=0;
        ControlUnitShow["IsHalt"]=0;
    }
    
    if(State==2){
       if(Op=="000001"){
           ALUOp=1;
           ControlUnitShow["ALUOp"]=1;
        }
       else if((Op=="100110")||(Op=="100111")){
           ALUOp=3;
           ControlUnitShow["ALUOp"]=3;
        }    
       else if(Op=="011000"){
           ALUOp=4;
           ControlUnitShow["ALUOp"]=4;
        }
       else if((Op=="010001")||(Op=="010100")){
           ALUOp=5;
           ControlUnitShow["ALUOp"]=5;
       }
       else if((Op=="010000")||(Op=="010011")){
           ALUOp=6;
           ControlUnitShow["ALUOp"]=6;
       }
       else if((Op=="010010")||(Op=="010101")||(Op=="110100")||(Op=="110101")||(Op=="110110")){
           ALUOp=7;
           ControlUnitShow["ALUOp"]=7;
       }
       else {
           ALUOp=0;
           ControlUnitShow["ALUOp"]=0;
       }
    }
    else {
        ALUOp=0;
        ControlUnitShow["ALUOp"]=0;
    }

    if(CLK==0){
        if(State==1){
            if((Op=="111000")||(Op=="111001")||(Op=="111010")){
                PCWre=1;
                ControlUnitShow["PCWre"]=1;
            }
            else {
                PCWre=0;
                ControlUnitShow["PCWre"]=0;
            }
        }
        else if(State==2){
            if((Op=="110100")||(Op=="110101")||(Op=="110110")){
                PCWre=1;
                ControlUnitShow["PCWre"]=1;
            }
            else{
                PCWre=0;
                ControlUnitShow["PCWre"]=0;
            }
        }
        else if(State==4){
            if(Op=="110000"){
                PCWre=1;
                ControlUnitShow["PCWre"]=1;
            }
            else {
                PCWre=0;
                ControlUnitShow["PCWre"]=0;
            }
        }
        else if(State==3){
            PCWre=1;
            ControlUnitShow["PCWre"]=1;
        }
        else {
            PCWre=0;
            ControlUnitShow["PCWre"]=0;
        }
    }
}

function ControlUnit_Show(nowins){
    if(preShow!=3)DeleteLi();
    var left=$("#left");
    var string,li,listring;
    if(nowins==undefined){
        var li=$("#left>li");
        li.remove();
        return;
    }
    string=nowins;
    listring='#InstructionLi';
    var li=left.find(listring);
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id=listring.substring(1);
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    for (x in ControlUnitShow){
        listring="#"+x;
        li=left.find(listring);
        string=x+":"+ControlUnitShow[x]+"\n";
        if(li.length<=0){
            li=document.createElement('li');
            li.innerText=string;
            li.id=x;
            left.append(li);
        }
        else{
            li[0].innerText=string;
        }
    }
}

function WriteReg_Select(Selector,InA,InB,InC,InD){
    if(Selector==0)WriteReg=InA;
    else if(Selector==1)WriteReg=InB;
    else if(Selector==2)WriteReg=InC;
    else if(Selector==3)WriteReg=InD;
    if(WriteReg==NaN||WriteReg==undefined)WriteReg="00000";
}

function PC4(){
    PC_4=curPC+4;
}

function WriteData_Select(Selector,InA,InB){
    if(Selector==0)WriteData=InA;
    else WriteData=InB;
}

function RegisterFile(){
    if(Reset==0){
        for(var i=0;i<32;++i)Registers[i]=0;
    }
    else if(RegWre==1&&WriteReg!="00000"&&CLK==0){
        Registers[parseInt(WriteReg,2)]=WriteData;
    }
    if(ReadReg1==NaN||ReadReg1==undefined)ReadReg1="00000";
    if(ReadReg2==NaN||ReadReg2==undefined)ReadReg2="00000";
    Data1=Registers[parseInt(ReadReg1,2)];
    Data2=Registers[parseInt(ReadReg2,2)];
}

function RegisterFile_Show(nowins){
    if(preShow!=4)DeleteLi();
    var left=$("#left");
    left.css("font-size","16.5px");
    var string,li,listring;
    if(nowins==undefined){
        var li=$("#left>li");
        li.remove();
        return;
    }
    string=nowins;
    listring='#InstructionLi';
    var li=left.find(listring);
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id=listring.substring(1);
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    for (var i=0;i<32;++i){
        listring="#Register"+i.toString();
        li=left.find(listring);
        string="$"+i.toString()+":"+Registers[i]+"\n";
        if(li.length<=0){
            li=document.createElement('li');
            li.innerText=string;
            li.id=listring.substring(1);
            left.append(li);
        }
        else{
            li[0].innerText=string;
        }
    }
}

function SignZeroExtend(ExtIn){
    return String_to_binary(ExtIn,32);
}

function ADR(){
    if(CLK==0){
        ReadData1=Data1;
    }
}

function BDR(){
    if(CLK==0){
        ReadData2=Data2;
    }
}

function ALUA_Select(nowins){
    if(ALUSrcA==0)ALUA=ReadData1;
    else {
        var str=SignZeroExtend[Sa[nowins]];
        ALUA=parseInt(Sa[nowins],2);
    }
}

function ALUB_Select(nowins){
    ExtOut=Negative_to_Number(Immediate[nowins],16);
    if(ALUSrcB==0)ALUB=ReadData2;
    else ALUB=ExtOut;
}

function ALU(){
    if(ALUOp==0)tempResult=ALUA+ALUB;
    else if(ALUOp==1)tempResult=ALUA-ALUB;
    else if(ALUOp==2)tempResult=(ALUA<ALUB)?1:0;
    else if(ALUOp==3)tempResult=(ALUA<ALUB)?1:0;
    else if(ALUOp==4)tempResult=ALUB<<ALUA;
    else if(ALUOp==5)tempResult=ALUA|ALUB;
    else if(ALUOp==6)tempResult=ALUA&ALUB;
    else if(ALUOp==7){
        tempResult=ALUA^ALUB;
    }
    else tempResult=0;
    Zero=(tempResult==0)?1:0;
    Sign=(tempResult<0)?1:0;
}

function ALU_Show(nowins){
    if(preShow!=5)DeleteLi();
    var left=$("#left");
    var string,li,listring;
    if(nowins==undefined){
        var li=$("#left>li");
        li.remove();
        return;
    }
    string=nowins;
    listring='#InstructionLi';
    var li=left.find(listring);
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id=listring.substring(1);
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="Result:"+Result.toString()+"\n";
    listring='#ResultLi';
    li=left.find(listring);
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id=listring.substring(1);
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="Zero:"+Zero.toString()+"\n";
    listring='#ZeroLi';
    li=left.find(listring);
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id=listring.substring(1);
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="Sign:"+Sign.toString()+"\n";
    listring='#SignLi';
    li=left.find(listring);
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id=listring.substring(1);
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
}

function ALUOutDR(){
    if(CLK==0){
        Result=tempResult;
    }
}

function DataMemory(){
    if(Reset==0){
        for(var i=0;i<60;++i)Datas[i]=0;
    }
    else{
        if(WR==0){
            Datas[Result]=ReadData2;
        }
    }
    if(RD==0&&CLK==1){
        DataOut=Datas[Result];
    }
    else if(RD==1)DataOut=0;
}

function Result_Data_Select(){
    if(DBDataSrc==0)TempData=tempResult;
    else TempData=DataOut;
}

function DataDB(){
    if(CLK==0){
        Data=TempData;
    }
}

function getJ_PC(nowins){
    J_PC=parseInt(Address[nowins],2);
    J_PC<<=2;
}

function getB_PC(nowins){
    B_PC=PC_4+Negative_to_Number(Immediate[nowins],16)*4;
}

function getNextPC(){
    if(IsHalt)NextPC=curPC;
    else if(Reset==0||PCSrc==0)NextPC=PC_4;
    else if(PCSrc==1)NextPC=B_PC;
    else if(PCSrc==2)NextPC=Data1;
    else if(PCSrc==3)NextPC=J_PC;
    else NextPC=0;
}

function ShowAll(i){
    if(preShow!=0)DeleteLi();
    var nowins=Instructions[i];
    if(nowins==undefined){
        var li=$("#left>li");
        li.remove();
        return;
    }
    var left=$("#left");
    string=nowins;
    listring='#InstructionLi';
    var li=left.find(listring);
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id=listring.substring(1);
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    var left=$("#left");
    var string="curPC:"+curPC.toString(16)+"\n";
    var li=left.find('#curPCLi');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="curPCLi";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="NextPC:"+NextPC.toString(16)+"\n";
    li=left.find('#NextPCLi');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="NextPCLi";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    if(Rs[nowins]!=undefined&&Rs[nowins]!=NaN){
        string="Rs:"+parseInt(Rs[nowins],2).toString(16)+"\n";
    }
    else string="Rs:0\n";
    li=left.find('#RsLi');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="RsLi";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="ReadData1:"+ReadData1.toString(16)+"\n";
    li=left.find('#ReadData1Li');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="ReadData1Li";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    if(Rt[nowins]!=undefined&&Rt[nowins]!=NaN){
        string="Rt:"+parseInt(Rt[nowins],2).toString(16)+"\n";
    }
    else string="Rt:0\n";
    li=left.find('#RtLi');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="RtLi";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="ReadData2:"+ReadData2.toString(16)+"\n";
    li=left.find('#ReadData2Li');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="ReadData2Li";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="Result:"+Result.toString(16)+"\n";
    li=left.find('#ResultLi');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="ResultLi";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
    string="DataOut:"+DataOut.toString(16)+"\n";
    li=left.find('#DataOutLi');
    if(li.length<=0){
        li=document.createElement('li');
        li.innerText=string;
        li.id="DataOutLi";
        left.append(li);
    }
    else{
        li[0].innerText=string;
    }
}

function Begin(){
    if(isStart){
        PC();
        var nowi=Math.floor(curPC/4);
        Instruction_Register(nowi);
        var nowins=Instructions[nowi];
        ControlUnit_State(InsReg);
        ControlUnit_Control(InsReg);
        WriteReg_Select(RegDst,"11111",Rt[InsReg],Rd[InsReg],"00000");
        PC4();
        WriteData_Select(WrRegDSrc,PC_4,Data);
        ReadReg1=Rs[InsReg];
        ReadReg2=Rt[InsReg];
        RegisterFile();
        ADR();
        BDR();
        ALUA_Select(InsReg);
        ALUB_Select(InsReg);
        ALU();
        ALUOutDR();
        DataMemory();
        Result_Data_Select();
        DataDB();
        getB_PC(InsReg);
        getJ_PC(InsReg);
        getNextPC();
        CLK_Show();
        if(Show==0)ShowAll(nowi);
        else if(Show==1)PC_Show();
        else if(Show==2)Instruction_Show(nowi);
        else if(Show==3)ControlUnit_Show(InsReg);
        else if(Show==4)RegisterFile_Show(InsReg);
        else if(Show==5)ALU_Show(InsReg);
        Draw_0();
        Draw_1();
        Draw_2();
        Draw_3();
        Draw_4();
        Draw_5();
        Draw_6();
        Draw_7();
        CLK=1-CLK;
        if(Reset==0&&CLK==1)Reset=1;
    }
    else{
        CLK_Show();
        if(Show==2)Instruction_Show(0);
    }
    setTimeout("Begin()",Time);
}

function getDivPos(id){
    var nowdiv=$("#"+id.toString())[0];
    var pos={};
    pos.left=nowdiv.offsetLeft;
    pos.top=nowdiv.offsetTop;
    pos.width=nowdiv.offsetWidth;
    pos.height=nowdiv.offsetHeight;
    return pos;
}

function Draw_Straight(ctx,beginx,beginy,endx,endy,level,sign=0){
    ctx.moveTo(beginx,beginy);
    ctx.lineTo(endx,endy);
    if(sign==0){
        ctx.lineTo(endx-level,endy-level);
        ctx.moveTo(endx,endy);
        ctx.lineTo(endx-level,endy+level);
    }
    else if(sign==1){
        ctx.lineTo(endx-level,endy-level);
        ctx.moveTo(endx,endy);
        ctx.lineTo(endx+level,endy-level);
    }
    else if(sign==2){
        ctx.lineTo(endx+level,endy-level);
        ctx.moveTo(endx,endy);
        ctx.lineTo(endx+level,endy+level);
    }
    else if(sign==3){
        ctx.lineTo(endx-level,endy+level);
        ctx.moveTo(endx,endy);
        ctx.lineTo(endx+level,endy+level);
    }
    ctx.stroke();
}

function Clear_Draw(nowcanvas){
    var height=nowcanvas.height;
    nowcanvas.height=height;
}

function Draw_0(){
    var beginpos=getDivPos("draw_0");
    var nowcanvas=document.getElementById("canvas_0");
    if(nowcanvas.getContext){
        var ctx=nowcanvas.getContext('2d');
        ctx.lineWidth=3;
        var beginx=0,endx=57,beginy=beginpos.height*0.1,endy=beginy;
        if(State==0&&CLK==1){
            ctx.strokeStyle="#000000";
            Draw_Straight(ctx,beginx,beginy,endx,endy,10);
            beginx=157;endx=212;beginy=beginpos.height*0.9;endy=beginy;
            Draw_Straight(ctx,beginx,beginy,endx,endy,10);
        }
        else if(State==0&&CLK==0){
            ctx.strokeStyle="#FF0000";
            beginx=256;endx=298;beginy=beginpos.height*0.9;endy=beginy;
            Draw_Straight(ctx,beginx,beginy,endx,endy,10);
        }
        else Clear_Draw(nowcanvas);
    }
}

function Draw_1(){
    var beginpos=getDivPos("draw_1");
    var nowcanvas=document.getElementById("canvas_1");
    if(nowcanvas.getContext){
        var ctx=nowcanvas.getContext('2d');
        ctx.lineWidth=3;
        var beginx=0,endx=135,beginy=10,endy=beginy;
        if(State==1&&CLK==0&&IsHalt==0){
            ctx.strokeStyle="#000000";
            Draw_Straight(ctx,beginx,beginy,endx,endy,11);
            beginx=197;endx=298;beginy=10;endy=beginy;
            Draw_Straight(ctx,beginx,beginy,endx,endy,11);
            beginx=0;endx=135;beginy=140;endy=beginy;
            Draw_Straight(ctx,beginx,beginy,endx,endy,11);
            beginx=197;endx=298;beginy=140;endy=beginy;
            Draw_Straight(ctx,beginx,beginy,endx,endy,11);
        }
        else if(State==2&&CLK==1){
            ctx.strokeStyle="#FF0000";
            Draw_Straight(ctx,0,0,0,0,13);
        }
        else if(State==3||State==0)Clear_Draw(nowcanvas);
    }
}

function Draw_2(){
    var beginpos=getDivPos("draw_2");
    var nowcanvas=document.getElementById("canvas_2");
    if(nowcanvas.getContext){
        var ctx=nowcanvas.getContext('2d');
        ctx.lineWidth=2.2;
        var beginx=0,endx=79,beginy=22,endy=beginy;
        if(State==2&&CLK==1){
            ctx.strokeStyle="#000000";
            Draw_Straight(ctx,beginx,beginy,endx,endy,7);
        }
        else if(State==2&&CLK==0){
            ctx.strokeStyle="#FF0000";
            Draw_Straight(ctx,0,0,0,0,15);
        }
        else if(State==4&&CLK==1){
            ctx.strokeStyle="#000000";
            beginx=112;endx=202;beginy=22;endy=beginy;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
            beginx=202;endx=202;beginy=22;endy=128;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
            beginx=202;endx=42;beginy=128;endy=128;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
            beginx=42;endx=42;beginy=128;endy=150;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
        }
        else if(State==4&&CLK==0){
            ctx.strokeStyle="#FF0000";
            Draw_Straight(ctx,0,0,0,0,15);
        }
        else Clear_Draw(nowcanvas);
    }
}

function Draw_3(){
    var beginpos=getDivPos("draw_3");
    var nowcanvas=document.getElementById("canvas_3");
    if(nowcanvas.getContext){
        var ctx=nowcanvas.getContext('2d');
        ctx.lineWidth=6;
        if(State==4&&CLK==1){
            var beginx=30,endx=30,beginy=0,endy=130;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
            ctx.lineWidth=2;
            beginx=30;endx=300;beginy=130;endy=130;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
        }
        else if(State==4&&CLK==0){
            ctx.lineWidth=2;
            ctx.strokeStyle="#FF0000";
            ctx.stroke();
        }
        else Clear_Draw(nowcanvas);
    }
}

function Draw_4(){
    var beginpos=getDivPos("draw_4");
    var nowcanvas=document.getElementById("canvas_4");
    if(nowcanvas.getContext){
        var ctx=nowcanvas.getContext('2d');
        ctx.lineWidth=3.5;
        if(State==4&&CLK==1){
            var beginx=0,endx=296,beginy=109.8,endy=109.8;
            Draw_Straight(ctx,beginx,beginy,endx,endy,10);
            beginx=169;endx=169;beginy=0;endy=30;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
            beginx=169;endx=296;beginy=30;endy=30;
            Draw_Straight(ctx,beginx,beginy,endx,endy,10);
        }
        else if(State==4&&CLK==0){
            ctx.strokeStyle="#FF0000";
            Draw_Straight(ctx,0,0,0,0,10);
        }
        else Clear_Draw(nowcanvas);
    }
}

function Draw_5(){
    var beginpos=getDivPos("draw_5");
    var nowcanvas=document.getElementById("canvas_5");
    if(nowcanvas.getContext){
        var ctx=nowcanvas.getContext('2d');
        ctx.lineWidth=2;
        var beginx=0,endx=134,beginy=10,endy=10;
        if(State==4&&CLK==1){
            Draw_Straight(ctx,beginx,beginy,endx,endy,7);
        }
        else if(State==4&&CLK==0){
            ctx.strokeStyle="#FF0000";
            Draw_Straight(ctx,0,0,0,0,10);
        }
        else if(State==3&&CLK==1){
            Clear_Draw(nowcanvas);
            beginx=204;endx=244;beginy=10;endy=10;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
            beginx=244;endx=244;beginy=10;endy=145;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
            beginx=244;endx=0;beginy=145;endy=145;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
        }
        else if(State==3&&CLK==0){
            ctx.strokeStyle="#FF0000";
            Draw_Straight(ctx,0,0,0,0,10);
        }
        else Clear_Draw(nowcanvas);
    }
}

function Draw_6(){
    var beginpos=getDivPos("draw_6");
    var nowcanvas=document.getElementById("canvas_6");
    if(nowcanvas.getContext){
        var ctx=nowcanvas.getContext('2d');
        ctx.lineWidth=10;
        var beginx=0,endx=450,beginy=126,endy=126;
        if(State==3&&CLK==1){
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
            ctx.lineWidth=1;
            beginx=0;endx=0;beginy=126;endy=0;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
        }
        else if(State==3&&CLK==0){
            Clear_Draw(nowcanvas);
            ctx.lineWidth=10;
            ctx.strokeStyle="#FF0000";
            beginx=0;endx=450;beginy=126;endy=126;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
            ctx.lineWidth=1;
            beginx=0;endx=0;beginy=126;endy=0;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
        }
        else Clear_Draw(nowcanvas);
    }
}

function Draw_7(){
    var beginpos=getDivPos("draw_7");
    var nowcanvas=document.getElementById("canvas_7");
    if(nowcanvas.getContext){
        var ctx=nowcanvas.getContext('2d');
        ctx.lineWidth=1.5;
        if(State==3&&CLK==1){
            var beginx=32,endx=120,beginy=20,endy=20;
            Draw_Straight(ctx,beginx,beginy,endx,endy,7);
            beginx=32;endx=32;beginy=20;endy=150;
            ctx.moveTo(beginx,beginy);
            ctx.lineTo(endx,endy);
            ctx.stroke();
        }
        else if(State==3&&CLK==0){
            ctx.strokeStyle="#FF0000";
            Draw_Straight(ctx,0,0,0,0,10);
        }
        else Clear_Draw(nowcanvas);
    }
}

window.onload=function(){
    for(var i=0;i<32;++i)Registers[i]=0;
    for(var i=0;i<60;++i)Datas[i]=0;
    var Start=document.getElementById("Start");
    Start.onclick=function () {
        if(isStart==1){
            preShow=Show;
            this.style.backgroundImage="url(Start.png)";
        }
        else{
            if(Show==2)preShow=2;
            this.style.backgroundImage="url(Pause.png)";
        }
        Time=500;
        isStart=1-isStart;
        $("#Slow").val("S");
        Show=0;
    };
    var Clear=$('#Clear');
    Clear.click(function(){
        while(Instructions.length>0){
            Instructions.pop();
        }
    });
    var nowReset=$('#Reset');
    nowReset.click(function(){
        Reset=0;
        CLK=1;
        curPC=0;
        NextPC=0;
        State=0;
    });
    var Slow=$('#Slow');
    Slow.click(function(){
        if(Time<=10000&&isStart==1){
            Time+=500;
            $(this).val("×"+(Time/500).toString());
        }
    });
    var PC=$('#PC');
    PC.click(function () {
        preShow=Show;
        Show=1;
    });
    var In=$('#In');
    In.click(function(){
        var InsIn=$('#InstructionInput');
        var value=InsIn[0].value.toString().trim();
        var nowInstructions=value.split("\n");
        for(var i=0;i<nowInstructions.length;++i){
            Instructions.push(nowInstructions[i]);
            Decode(nowInstructions[i]);
        }
        // Instructions.push(str);
        InsIn[0].value="";
    });
    var Ins=$('#InstructionMemory');
    Ins.click(function(){
        preShow=Show;
        Show=2;
    });
    var ControlUnit=$('#ControlUnit');
    ControlUnit.click(function(){
        preShow=Show;
        Show=3;
    });
    var RegisterFile=$('#RegisterFile');
    RegisterFile.click(function(){
        preShow=Show;
        Show=4;
    });
    var ALU=$('#ALU');
    ALU.click(function(){
        preShow=Show;
        Show=5;
    });
    Begin();
}