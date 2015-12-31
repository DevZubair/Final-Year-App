hospitalModule.factory('hospitalFactory',function ()

{
    var clinicID='';
    var getterName=function(id)
    {
        setterName(id);
    };
    var setterName=function(id)
    {
        clinicID=id;
      localStorage.setItem('ClinicID',id);
    };
    var returnClinic=function(){
        return localStorage.getItem('ClinicID');
    };
    return{
        returnClinic:returnClinic,
        getterName:getterName
    }
});
