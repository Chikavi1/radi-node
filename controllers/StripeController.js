const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51IiBSHJl56kWzuPaL91A5twEkOTOuXqFulTRgY3Yh9LH8bfSIvREnHbmjyBw0vQuN4jzbySE2rV5yr0UcZN4Wuul00ydof9N0K');


module.exports.createCostumer = async (req, res) => {

    const { email,name, phone } = req.body;


        const customer = await stripe.customers.create({
            // source:  req.params.token,
            email,
            name,
            phone
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
    // console.log(req.params.costumerid,req.params.token);
    const { customer,token } = req.body;
    const source = stripe.customers.createSource(
        customer,
        {
        source: token,
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

module.exports.createToken = async (req,res) => {
        const { number,exp_month,exp_year,cvc } = req.body;
        console.log(req.body);
        try{

            const token = await stripe.tokens.create({
                card: {
                    number,
                    exp_month,
                    exp_year,
                    cvc,
                    currency: 'mxn'
                },
            });
            return res.json(token);
        }catch(e){
            console.log(e);
            res.status(402);
            return res.json(e);
        }

}
















//   const transfers = await stripe.transfers.list({
//     limit: 3,
//     destination: 'acct_1J26OpG9XI6hZAKx'
// });

//       const account = await stripe.balance.retrieve({
//         stripeAccount: 'acct_1IiBSHJl56kWzuPa'
// });

        //   return res.json(transfers);



    





    // Crear cuenta de vets

    // const account = await stripe.accounts.create({
    //     type: 'custom',
    //     country: 'mx',
    //     email: 'chikavi99@gmail.com',
    //     business_type: 'company',
    //     company: {
    //         name: "Veterinaria Chikavi"
    //     },
    //     capabilities: {
    //         card_payments: {requested: true},
    //         transfers: {requested: true},
    //       },
    //     settings: {
    //         card_payments: {
    //             statement_descriptor_prefix: "DESC ABRE"
    //         },
    //         payments: {
    //             statement_descriptor: "DESCRIPCION DEL CARGO ",
    //         }
    //     }
    //     });

// obtener cuenta de vets


        // const account = await stripe.accounts.del(
        // 'acct_1J25sfBoVJhODbmL'
        // );

        // const account = await stripe.accountLinks.create({
        //     account: 'acct_1J25sfBoVJhODbmL',
        //     refresh_url: 'https://example.com/reauth',
        //     return_url: 'https://example.com/return',
        //     type: 'account_onboarding',
        //   });

// obtener saldo    
        //   const account = await stripe.balance.retrieve({
        //     stripeAccount: 'acct_1IiBSHJl56kWzuPa'
        //   });

        //   obtener eventos

        // const account = await stripe.events.list({
        //     limit: 3,
        //     // account:'acct_1IiBSHJl56kWzuPa'
        //   });

        // eliminar cuenta



// actualizar cuenta de vets
//     const account = await stripe.accounts.update(
//     'acct_1J25sfBoVJhODbmL',
//     {
//         business_profile: {
//         url: 'https://api.radi.pet/',
//         product_description: 'Veterinaria en tlaquepaque'
//     },
//     tos_acceptance: {
//         date: Math.floor(Date.now() / 1000),
//         ip: req.connection.remoteAddress, // Assumes you're not using a proxy
//       },
//     }
//   );


        // return res.json(account);



    

    //   console.log(source);

      


  





        // HACER COBRO

        //   const charge = await stripe.charges.create({
        //     amount:   4600,
        //     currency: 'mxn',
        //     customer: costumer,
        //     description: 'compra en radiss',
        //     application_fee_amount: 1000,
        //     transfer_data: {
        //         destination: 'acct_1J26OpG9XI6hZAKx',
        //     },
        //     });
        //     return res.json(charge);

        // HACER COBRO



    // const generate = await stripe.paymentIntents.retrieve('pi_1J0UIbCLbb37u5arL0TBQfuF');
    // return res.json(generate);









// veterinarios
module.exports.createAccount = async (req, res) => {
    const { vet_id,email,name, card_token } = req.body;

    const account = await stripe.accounts.create({
        type: 'standard',
        country: 'mx',
        // external_account: 'btok_1J9L2UJl56kWzuPauLN8vh1J',
        email: email,
        business_type: 'individual',
        // tos_acceptance: {
        //     date: Math.floor(Date.now() / 1000),
        //     ip: req.connection.remoteAddress, // Assumes you're not using a proxy
        //   },
        company: {
            name: name
        },
        individual:{
            email: email
        },
        business_profile: {
            mcc: '0742',
            url: 'radi.pet/vet/'+vet_id
        },
        settings: {
            card_payments: {
                statement_descriptor_prefix: "VET Radi"
            },
            payments: {
                statement_descriptor: "CARGO en RADI ",
            }
        }
        });

        return res.json(account)
}

module.exports.deleteAccount = async (req, res) => {
    const { account } = req.body;

        const getAccount = await stripe.accounts.del(
            account
        );

        return res.json(getAccount)

}


module.exports.getAccount = async (req, res) => {
    const { account } = req.body;

    const getAccount = await stripe.accounts.retrieve(
        account
    );


    return res.json(getAccount);

}



// crear link para que el veterinario se pueda registrar
module.exports.createLinks = async (req, res) => {

        const { account } = req.body;
        
        const links = await stripe.accountLinks.create({
            // account: 'acct_1J25sfBoVJhODbmL',
            account: account,
            refresh_url: 'https://example.com/reauth',
            return_url: 'https://example.com/return',
            type: 'account_onboarding',
          });

        return res.json(links);
}


module.exports.CreateCharge = async (req, res) => {

    const { amount,customer,account_id} = req.body
    console.log(req.body);
const charge = await stripe.charges.create({
    amount,
    currency: 'usd',
    customer,
    description: 'compra en radiss',
    application_fee_amount: 1000,
    transfer_data: {
        destination: account_id,
    },
    });
    return res.json(charge);

}

module.exports.getBalance = async (req, res) => {
    const {  account} = req.body
    const balance = await stripe.balance.retrieve({
            stripeAccount: account
    });

    return res.json(balance);
}

module.exports.getCharges = async (req, res) => {
    const { account} = req.body

    const charges = await stripe.charges.list(
        {
          limit: 3,
        },
        {
          stripeAccount: account
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


module.exports.createBankAccount = async (req, res) => {


    const token = await stripe.tokens.create({
        bank_account: {
          country: 'MX',
          currency: 'mxn',
          account_holder_name: 'Olvia diaz ',
          account_holder_type: 'individual',
        //   routing_number: '110000000',
        //   account_number: '014320605751026242',
        account_number: '000000001234567897',

        
        },
      });


    return res.json(token);

}

