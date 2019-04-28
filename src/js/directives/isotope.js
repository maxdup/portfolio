var Isotope = require('isotope-layout');
require('isotope-masonry-horizontal');

function isotope ($window, $timeout){
  "ngInject"

  return {
    restrict: 'E',
    replace: true,
    link: function(scope, element, attrs){
      var rowHeight = 200;
      var levels = parseInt(element[0].clientHeight / rowHeight);

      function getOrder(levelsN){
        if (levelsN <= 2){ return 'lvl2' }
        if (levelsN == 3){ return 'lvl3' }
        if (levelsN >= 4){ return 'lvl4' }
      }
      var lvln = getOrder(levels);
      var iso = new Isotope('#'+attrs.id, {
        layoutMode: 'masonryHorizontal',
        itemSelector: '.box',
        getSortData: {
          lvl4: '[lvl3] parseInt',
          lvl3: '[lvl3] parseInt',
          lvl2: '[lvl2] parseInt',
        },
        sortBy: lvln,
        masonryHorizontal: {
          rowHeight: rowHeight
        }
      });
      scope.reload = function() {
        iso.updateSortData();
        iso.arrange({'sortBy': getOrder(levels)})
      };
      iso.on('layoutComplete', function(filteredItems){
        var newlevels = parseInt(element[0].clientHeight / rowHeight);
        if (newlevels != levels){
          levels = newlevels;
          iso.updateSortData();
          iso.arrange({'sortBy': getOrder(newlevels)});
        }
      })
      scope.$on('isotopeReload', scope.reload);
      scope.$on('isotopeLayout', iso.layout);

      scope.$on('$destroy', function(){iso.destroy()});
    }
  }
}
export default isotope;
