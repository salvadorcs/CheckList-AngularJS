var app = angular.module('angularChecklistApp', ['checkbox-select']);
app.controller('angularChecklistCtrl', function ($scope) {
    var itemList = [];
    $scope.checkedItems = [];

    $scope.addNewItem = function (form) {
        itemList.push({itemName: form.newItem, status: false});
        $scope.clearForm();
    }

    $scope.toggleStatus = function (item, index) {
        itemList[index].status = !item.status;
    }

    $scope.listItems = function () {
        return itemList;
    }

    $scope.clearForm = function () {
        $scope.newItem = '';
    }
    $scope.clearForm();
});


angular
    .module("checkbox-select", [])
    .directive("checkboxModel", ["$compile", function ($compile) {
        return {
            restrict: "A",
            link: function (scope, ele, attrs) {
                if (!scope.$parent.updateSelections) {
                    scope.$parent.updateSelections = function (selectedItems, item, isMultiple) {
                        var itemIndex = selectedItems.indexOf(item)
                        var isPresent = (itemIndex > -1)
                        if (isMultiple) {
                            if (isPresent) {
                                selectedItems.splice(itemIndex, 1)
                            } else {
                                selectedItems.push(item)
                            }
                        } else {
                            if (isPresent) {
                                selectedItems.splice(0, 1)
                            } else {
                                selectedItems.splice(0, 1, item)
                            }
                        }
                    }
                }
                ele.attr("ng-checked", attrs.checkboxModel + ".indexOf(" + attrs.checkboxValue + ") > -1")
                var multiple = attrs.multiple ? "true" : "false"
                ele.attr("ng-click", "updateSelections(" + [attrs.checkboxModel, attrs.checkboxValue, multiple].join(",") + ")")
                ele.removeAttr("checkbox-model")
                ele.removeAttr("checkbox-value")
                ele.removeAttr("multiple")
                $compile(ele)(scope)
            }
        }
    }])