exports.getCustomers = ()=>{
    return "SELECT * FROM customer"
}
exports.findCustomer = ()=>{
    return 'SELECT * FROM customer WHERE ID=?'
}