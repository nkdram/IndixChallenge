

module.exports = function(sequelize, DataTypes) {

    var ProductCategory = sequelize.define('ProductCategory', {
            store: DataTypes.TEXT,
            average: DataTypes.DECIMAL,
            toplevelcategory: DataTypes.TEXT
        },
        {
            classMethods:{
                tableName: 'vw_groupedProducts'
            }
        }
    );

    return ProductCategory;
};