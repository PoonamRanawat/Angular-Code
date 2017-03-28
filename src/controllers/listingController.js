angular.module("myApp", []).controller("listingController", ['$scope', '$filter', function ($scope, filter) {
    $scope.textSearch = "";
    $scope.listData =    
            {"data": 
             [{
                        "id": 1,
                        "name": "Jhon",
                        "phone": "9999999999",
                        "address":
                        {
                          "city": "Pune",
                          "address_line1":"ABC road",
                          "address_line2":"XYZ building",
                          "postal_code":"12455"
                        }
                      }, {
                        "id": 2,
                        "name": "Jacob",
                        "phone": "AZ99A99PQ9",
                        "address":
                        {
                          "city": "Pune",
                          "address_line1":"PQR road",
                          "address_line2":"ABC building",
                          "postal_code":"13455"
                        }
                      }, {
                        "id": 3,
                        "name": "Ari",
                        "phone": "145458522",
                        "address":
                        {
                          "city": "Mumbai",
                          "address_line1":"ABC road",
                          "address_line2":"XYZ building",
                          "postal_code":"12455"
                        }
                      }, {
                          "id": 4,
                          "name": "Aru",
                          "phone": "1454458522",
                          "address":
                          {
                              "city": "Mumbai",
                              "address_line1": "ABC road",
                              "address_line2": "XYZ building",
                              "postal_code": "12905"
                          }
                      }, {
                          "id": 5,
                          "name": "Luci",
                          "phone": "34538522",
                          "address":
                          {
                              "city": "Mumbai",
                              "address_line1": "ABC road",
                              "address_line2": "XYZ building",
                              "postal_code": "16555"
                          }
                      }
             ]}
    
    function checkNumber() {
        for (var i = 0; i < $scope.listData.data.length; i++) {
            if (!isNaN($scope.listData.data[i].phone)) {
                //This is a number
            } else {
                //This is not a number
                $scope.listData.data[i].phone = "";
            }
        };
    };
    checkNumber(); //Function to check data in Phone Column - Display NA if not a number

    $scope.addEmployees = function (dataEntered) {
        if (dataEntered == undefined || dataEntered == "undefined" || dataEntered == "null" || dataEntered == null) {
            return alert("Please enter data");
        } else {
            validateDataEntered(dataEntered);
        }
        $('#myModal').modal('hide');
    };

    function validateDataEntered(dataEntered){
        if (dataEntered.name) {
            if (dataEntered.name.length < 4) {
                alert("Please enter more than 4 characters");
                return false;
            }
        } else {
            alert("Please enter full name");
            return false;
        }
        if (dataEntered.phone) {
            if (isNaN(dataEntered.phone)) {
                alert("Please enter valid phone number");
                return false;
            }
        } else {
            alert("Please enter phone number");
            return false;
        }
        $scope.listData.data.push(dataEntered);
        $scope.close = function () {
            $modalInstance.dismiss('close');
        };
        $('#myModal').on('hidden.bs.modal', function () {
            $(this).find("input,textarea,select").val('').end();
        });
    }    
    

    //Function to filter name and city from listing - start
    $scope.filterFunction = function (element) {
       if (element.name.match(new RegExp("(" + $scope.textSearch + ")", "i")) ? true : false || element.address.city.match(new RegExp("(" + $scope.textSearch + ")", "i")) ? true : false) {
          return element;
       };
    };
    //Function to filter name and city from listing - end

    //routing - start
    var app = angular.module("myApp", ["ngRoute"]);
    app.config(function ($routeProvider) {
        $routeProvider
        .when("/employees", {
            templateUrl: "index.html"
        });
    });
    //routing - end

    //edit data - start
    $scope.open = function (data) {
        $scope.dataToEdit = data;
    };
    //edit data - end

    //update data - start
    $scope.updateEmployees = function (dataToEdit) {
        if (dataToEdit == undefined || dataToEdit == "undefined" || dataToEdit == "null" || dataToEdit == null) {
            return alert("Please enter data");
        } else {
            validateDataEntered(dataToEdit);
        }
        $('#myEditModal').modal('hide');
    };
    //update data - end
}]);