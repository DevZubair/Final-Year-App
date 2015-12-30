hospitalModule.factory('hospitalFactory',function ()

{
    var clinicName='';
    var getterName=function(name)
    {
        setterName(name);
    };
    var setterName=function(clinic)
    {
        clinicName=clinic;
    };
    var returnClinic=function(){
        return clinicName;
    };
    return{
        returnClinic:returnClinic,
        getterName:getterName
    }
});