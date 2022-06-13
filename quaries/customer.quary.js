exports.getCustomers = ()=>{
    return "SELECT * FROM customer"
}
exports.findCustomer = (customerId)=>{
    return `SELECT * FROM customer WHERE ID=${customerId}`
}