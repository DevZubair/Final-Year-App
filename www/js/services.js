hospitalModule.factory('hospitalFactory',function ()

{
  var Doctor='',
    ClinicDetails = '';

  var getterName=function(clinic)
  {
    setterName(clinic);
  };
  var setterName=function(clinic)
  {
    ClinicDetails = clinic;
    localStorage.setItem('Clinic',JSON.stringify(clinic));
    localStorage.setItem('ClinicID',clinic._id);
  };
  var returnClinic=function(){
    return ClinicDetails
  };

  var getterDoctor=function(contents)
  {
    setterDoctor(contents);
  };
  var setterDoctor=function(contents)
  {
    Doctor=contents;
    localStorage.setItem('Doctor',JSON.stringify(contents));
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
