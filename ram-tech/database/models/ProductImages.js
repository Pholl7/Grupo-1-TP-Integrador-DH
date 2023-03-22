module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImages";
    let cols = {
        id: {
            type: dataTypes.INT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.TEXT,
        },
    };
    let config = {
        tableName: "product_images",
        timestamps: false,
    };
    const Product_images = sequelize.define(alias, cols, config);

    Product_images.associate = (models) => {
        Product_images.belongsTo(models.Product, {
            as: 'products',
            foreignKey: 'products_id'
        }); 
    }

    return Product_images
};