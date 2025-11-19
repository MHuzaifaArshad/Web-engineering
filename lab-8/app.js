var app = angular.module('recipeApp', []);

app.controller('MainCtrl', function($scope) {
  var vm = this;

  vm.recipes = [];
  vm.form = {};
  vm.editMode = false;
  vm.editId = null;
  vm.localKey = "recipe_data_v1";

 
  vm.load = function () {
    var stored = localStorage.getItem(vm.localKey);
    if (stored) {
      vm.recipes = JSON.parse(stored);
    }
  };

  vm.saveLocal = function () {
    localStorage.setItem(vm.localKey, JSON.stringify(vm.recipes));
  };

 
  vm.saveRecipe = function () {
    if (!vm.form.title || !vm.form.ingredients || !vm.form.instructions) {
      alert("Please fill all required fields.");
      return;
    }

    if (vm.editMode) {
     
      var index = vm.recipes.findIndex(r => r.id === vm.editId);
      vm.recipes[index] = {
        id: vm.editId,
        title: vm.form.title,
        ingredients: vm.form.ingredients,
        instructions: vm.form.instructions,
        image: vm.form.image || null
      };
      vm.editMode = false;
      vm.editId = null;

    } else {
     
      vm.recipes.push({
        id: Date.now(),
        title: vm.form.title,
        ingredients: vm.form.ingredients,
        instructions: vm.form.instructions,
        image: vm.form.image || null
      });
    }

    vm.saveLocal();
    vm.form = {};
  };


  vm.editRecipe = function (r) {
    vm.form = angular.copy(r);
    vm.editMode = true;
    vm.editId = r.id;
  };

  vm.cancelEdit = function () {
    vm.editMode = false;
    vm.editId = null;
    vm.form = {};
  };

  vm.deleteRecipe = function (id) {
    if (confirm("Delete this recipe?")) {
      vm.recipes = vm.recipes.filter(r => r.id !== id);
      vm.saveLocal();
    }
  };

  // Load image as base64
  vm.handleImage = function (files) {
    if (!files.length) return;

    var reader = new FileReader();
    reader.onload = function (e) {
      $scope.$apply(function () {
        vm.form.image = e.target.result;
      });
    };
    reader.readAsDataURL(files[0]);
  };

  vm.load(); 
});
