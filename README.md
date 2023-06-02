# clubkiosk
Keep track of what the members of your club take out of the fridge. Allow them to pay using a member account or straight away by cash. View the current stock status remotely.

### Problem

This software is used in a flying club. The original problem: People took drinks from a fridge, and wrote their name and consumed goods on a tally sheet (Strichliste). A poor soul had to collect the list, count the strikes, and contact each individual to regularly pay their debts. 

### New Workflow 
Workflow for the customers/club members: Take a drink from the fridge. Scan it using a barcode scanner. Select their name on the screen. Choose to pay by cash or using a member account. Done. 

Workflow for chief of kiosk regarding accounting: Every once in a while, use the accounting functionality. Receive a full list of members and dues with a few clicks. Optionally, use the vereinsflieger.de-integration to automatically bill club members via direct debit (SEPA-Lastschrift). 

Workflow for chief of kiosk regarding stock: Check the stock status once in a while and send an email to the beverage supplier to deliver new crates.

### Brief History

I built this software back in 2014 to learn Angular (2, back then). It's mainly used in connection with Vereinsflieger. With a little bit of coding, the functionalities can likely be extended to other non-flying clubs. Backend based on PHP/Laravel, Frontend on JS/Angular. 

### Miscellaneous

Usability is surprisingly good, even for older folks (I was surprised myself). 
The system is - also to my own surprise - running very stable since for about 8 years now. 
Open source software.

## Features
- As-quick-as-possible checkout
- Pay by member account or cash
- Member accounts can be password protected to avoid unauthorized payment/billing
- Stock management
- User management (add, delete, change email/password...)
- Support for mandatory price information ("Pflichtpreisangaben") for drinks (e.g. 1 EUR/Liter)
- Vereinsflieger.de accounting integration (automatically charge people's debtor accounts)

## Compatibility
You can use standard 1D barcode scanners which act as keyboard with the system. The Angular-code allows definition of "special starting characters".

The system has a vereinsflieger.de integration.

## Screenshots
Todo

## Todo
- Update to latest Laravel/Angular versions
- Multilingual support (currently only in German)
- Better separation of Vereinsflieger.de-integration
- Extend support for non-drinks (maybe?)

## Development
TODO 

## Deployment
TODO

## Rollout
We use this system in combination with a fridge (obviously) and a Raspberry Pi/touchscreen/barcode scanner (see above).