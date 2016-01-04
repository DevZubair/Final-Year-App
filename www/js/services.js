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
    var Doctor='';

    var getterDoctor=function(contents)
    {
        setterDoctor(contents);
    };
    var setterDoctor=function(contents)
    {
        Doctor=contents;
      localStorage.setItem('DoctorID',contents._id);
    };
    var returnDoctor=function(){
       // var DoctorData = localStorage.getItem('Doctor');
        return Doctor
    };
    return{
        returnClinic:returnClinic,
        returnDoctor:returnDoctor,
        getterName:getterName,
        getterDoctor : getterDoctor
    }
});
