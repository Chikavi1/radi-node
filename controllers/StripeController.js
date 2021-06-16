const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51IiBSHJl56kWzuPaL91A5twEkOTOuXqFulTRgY3Yh9LH8bfSIvREnHbmjyBw0vQuN4jzbySE2rV5yr0UcZN4Wuul00ydof9N0K');


module.exports.createCostumer = async (req, res) => {
        const customer = await stripe.customers.create({
            source:  req.params.token,
            email:  req.params.email,
            name: req.params.name
          });
          return res.json(customer);
}

module.exports.getCostumer = async (req, res) => {

    const result = await stripe.customers.retrieve(
            req.params.costumerid,
            function(err, customer) {
            return res.json(customer);
        }
        );
}

module.exports.updateCostumer = async (req, res) => {

    const customer = await stripe.customers.update(
       req.params.costumerid,
        { default_source: req.params.card}
    );

    return res.json(customer);
}




module.exports.getCards = async (req, res) => {
   
    const result = await stripe.customers.listSources(
        req.params.costumerid,
        { limit: 10}
      );
      return res.json(result);
}



module.exports.getCard = async (req, res) => {
    const card = await stripe.customers.retrieveSource(
        req.params.costumerid,
        req.params.card);

    return res.json(card);
}



module.exports.addCard = async (req, res) => {
    console.log(req.params.costumerid,req.params.token);

    const source = stripe.customers.createSource(
        'cus_JfmWRufNiyDu9b',
        {
        source: 'tok_1J2j1MJl56kWzuPaYsHkHssR',
        },
        function(err, source) {
        // asynchronously called
        console.log(source);
        console.log(err);

        });

        return res.json(source);
}


module.exports.deleteCard = async (req, res) => {
    console.log(req.params.costumerid,req.params.card);

        const result = stripe.customers.deleteSource(
        req.params.costumerid,
        req.params.card,
        function(err, source) {
            // asynchronously called
            console.log(source);
            console.log(err);

            return res.json(source);

        });

}

























// veterinarios
module.exports.createAccount = async (req, res) => {

    const account = await stripe.accounts.create({
        type: 'custom',
        country: 'mx',
        email: 'chikavi99@gmail.com',
        business_type: 'company',
        company: {
            name: "Veterinaria Chikavi"
        },
        capabilities: {
            card_payments: {requested: true},
            transfers: {requested: true},
          },
        settings: {
            card_payments: {
                statement_descriptor_prefix: "DESC ABRE"
            },
            payments: {
                statement_descriptor: "DESCRIPCION DEL CARGO ",
            }
        }
        });
}

module.exports.deleteAccount = async (req, res) => {

        const account = await stripe.accounts.del(
        'acct_1J25sfBoVJhODbmL'
        );

}

// crear link para que el veterinario se pueda registrar
module.exports.CreateLinks = async (req, res) => {

        const account = await stripe.accountLinks.create({
            account: 'acct_1J25sfBoVJhODbmL',
            refresh_url: 'https://example.com/reauth',
            return_url: 'https://example.com/return',
            type: 'account_onboarding',
          });
}


module.exports.CreateCharge = async (req, res) => {

const charge = await stripe.charges.create({
    amount:   4600,
    currency: 'mxn',
    customer: costumer,
    description: 'compra en radiss',
    application_fee_amount: 1000,
    transfer_data: {
        destination: 'acct_1J26OpG9XI6hZAKx',
    },
    });
    return res.json(charge);

}

module.exports.getBalance = async (req, res) => {

    const account = await stripe.balance.retrieve({
            stripeAccount: 'acct_1J26OpG9XI6hZAKx'
    });

    return res.json(account);
}

module.exports.getCharges = async (req, res) => {

    const charges = await stripe.charges.list(
        {
          limit: 3,
        },
        {
          stripeAccount: 'acct_1J26OpG9XI6hZAKx'
        }
      );

    return res.json(charges);
}



module.exports.getEvents = async (req, res) => {


        const account = await stripe.events.list({
            limit: 3,
            // account:'acct_1IiBSHJl56kWzuPa'
          });

}