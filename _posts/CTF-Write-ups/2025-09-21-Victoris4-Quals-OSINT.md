---
title: "OSINT Writeup — IEEE VICTORIS4 CTF Quals"
classes: wide
header:
  teaser: /assets/images/Covers/victoris4.png
ribbon:   RoyalBlue
description: "After a full 24 hours in the `IEEE VICTORIS4 CTF` qualifications phase, I’m happy to share my write-up for three OSINT challenges I created: two Investigations (*Easy/Medium*) and one Geo (*Hard*), this is a step-by-step walkthrough aimed at beginners."

categories:
  - Write-Ups
toc: true
---

## <span style="color:#0056D2;">**Introduction**</span>

After a full 24 hours in the `IEEE VICTORIS4 CTF` qualifications phase, I’m happy to share my write-up for three OSINT challenges I created: two Investigations (*Easy/Medium*) and one Geo (*Hard*).

This is a step-by-step walkthrough aimed at beginners.  

---

## <span style="color:#0056D2;">**The Phantom Maintainer**</span>


### Description

```txt
30 milliseconds.
That’s all it took for a curious researcher to realize something wasn’t right.
His SSH connections on a Debian Sid box felt… heavy, CPU usage spiked without reason, A memory debugger whispered errors no one had ever seen before.
From that tiny anomaly unraveled one of the largest supply-chain compromises the open-source world has faced in years.
Somewhere inside the project’s commits hides a phantom maintainer — a name without a past, a presence without a trace.
He wasn’t alone. Two more voices echoed alongside his, applying pressure, pushing changes, steering trust.

Your task:
Follow the crumbs.
Find the project.
Unmask the rogue.
Name his allies.
Flag parts
The co-maintainer’s full name → fname-mname-lname
The date of his first commit → mm/dd/yyyy
The names of two teammates who aided the pressure campaign → fname-lname,fname-lname
Flag format
IEEE{fname-mname-lname,mm/dd/yyyy,fname-lname,fname-lname}

Example:
If the maintainer was John Middle Doe, with first commit on 01/01/2020, and teammates Alice Smith and Bob Brown:

IEEE{John-Middle-Doe,01/01/2020,Alice-Smith,Bob-Brown}
```
First we search for the name of the target project and after some researching we can be sure that it's XZ Utils incident, so we start searching for the maintainers of the project.

On the official GitHub repository, we can see this commit in the `AUTHORS` file under the name `Add Jia Tan to AUTHORS.`

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/github-commit.png)

So, now we know that there is another maintainer (Author) than the original `Lasse Collin`, his name is `Jia Tan`, but we need his full name, so searching any commits archive like [git.tukaani.org](https://git.tukaani.org/), by searching all `Jia Tan`'s commits, we see a different name at `2022-12-30` with the name `Jia Cheong Tan`, 'Cheong' is a name often used in Cantonese, but 'Jia' is rarely used in Cantonese. For this reason, we speculates that "the name 'Jia Cheong Tan' is just a plausible combination of Chinese-sounding names."

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/full-name.png)

***Full name: Jia-Cheong-Tan***


Now, we have the full name, let's get to the date of his first commit,
I opened the [Mail Archive](https://www.mail-archive.com/xz-devel@tukaani.org/) to see xz-devel mailing list, and start searching for `Jia Tan`'s first comment, and it was no more than a very simple editor config file introduction. 

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/date-of-first-commit.png)


![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/content-of-first-commit.png) 


***Date: 10/29/2021***


Last, we go for his teammates, Getting back to the xz-devel mailing list, It's clear that over the summer of 2022 Lasse Collin got interest pressured to add a maintainer, two of them was very exposing, and they both were address to `Jigar Kumar`

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/mail-2.png) 

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/mail-1.png)
 

Another one this `Dennis Ens`, he also tried to pressure `Lasse Collin` to add a new maintainer, he even mentioned `Jia Tan` personally.

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/mail-3.png)


***Teammates: Dennis-Ens & Jigar-Kumar***

Flag: <span style="color:#0056D2;">**IEEE{Jia-Cheong-Tan,10/29/2021,Dennis-Ens,Jigar-Kumar}**</span>



____
____

## <span style="color:#0056D2;">**Ugly Inside — The Leak Trace**</span>


### Description
```
There once was an underground Telegram channel named "ugly inside and out", infamous for dragging secrets out of the shadows. On "20 Jan 2024, 01:25", the channel published a message about the arrest of an administrator of a dark-web forum. That message itself was a forward from another group.

In that second group, look for the "Rule 5(c)(3) Affidavit" related to the arrest. Inside the affidavit you will find the name of the FBI case agent who led the arrest. This will be the first part of your flag.

Within the same affidavit you will also discover the alias used by this administrator. Search for a certain Bitcoin wallet address that is connected to this alias. That wallet address will be the second part of your flag.

Finally, where you uncover the wallet address, you will also find a request for this admin to middleman a transaction. Investigate the buyer: this individual always used Tor with a VPN. Extract the VPN email address they relied on. That will be the third part of your flag.

Flag Format
IEEE{<agent_name>,<btc_address>,<vpn_email>}

Example:
IEEE{John_Doe,1Aa2Bb3Cc...,vpnuser@example.com}
```

First, we have a Telegram channel named `ugly inside and out`, so we start with any Telegram analytics platform like the [TGStat Services](https://tgstat.com/channel/@explain), and search for our channel.

We can't open the channel on Telegram because it had been deleted, but we still can read some of its messages, we filter the messages with our date and here is the desired message:

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/msg-1.png)

Now, we have the name `Conor Fitzpatrick`and a second group `vx-underground`, so we open the second group on Telegram and start investigating `Conor Fitzpatrick`.

In the group, you can see a link for the [Rule 5(c)(3) Affidavit](https://storage.courtlistener.com/recap/gov.uscourts.nysd.595805/gov.uscourts.nysd.595805.1.0.pdf) of this `Conor Fitzpatrick`.

by opening it, we know even more than we need:
- `Conor Fitzpatrick` is the admin we seek for.

- His alias is `pompompurin`

- The Forum is `BreachForums`

- The FBI case agent is `John Longmire`

With all what we have, we now can go to the the case file on [United States
Attorney's Office](https://www.justice.gov/usao-edva/united-states-v-conor-brian-fitzpatrick) and get the Court Documents
 mainly the [Criminal Complaint](https://www.justice.gov/usao-edva/file/1300536/dl?inline).

In the Criminal Complaint, we can see details of `pompompurin` middlemanning a deal between an FBI OCE and a forum-user named `expo2020`, `pompompurin` had given the OCE his wallet address which is what we need 

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/wallet.png)

Wallet address: ***bc1q24gp83glmeh3kgfn23zs7l8l2nhnu6m8xllcvd***

Now, we need more info about the OCE, we know that the deal was on `BreachForums` with `expo2020`, so we go to [BF Database Search](https://bf.based.re/) and search about `expo2020`.

Within his DMs, we see `pompompurin` telling him about the deletion of his thread because a rule violation, the thread was about selling the same data that our OCE bought, which tells us we are getting to right person


![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/Thread-removed.png)

later, we see another DM message from someone asking about the same data, and `expo2020` replied with `yes, written in tg`, the username was `cr4ck4`.

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/first-contact.png)

This could be our OCE, so we search his profile and DMs and see him replying to the same `pompompurin` message that was within the `Criminal Complaint`

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/confirm-deal.png)


So, now we are sure that the OCE name is `Cr4ck4`, getting his vpn email is easy since we have his leaked profile data, just get to his `basic_info` section and you have his vpn email.

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/vpn-mail.png)

Now, we have the three parts of the flag.

Flag: <span style="color:#0056D2;">**IEEE{John_Longmire,bc1q24gp83glmeh3kgfn23zs7l8l2nhnu6m8xllcvd,cr4ck4@protonmail.com}**</span>


___
___

## <span style="color:#0056D2;">**Frozen Yard**</span>


### Description
``` 
The cold wind cuts across an empty plain, where rusting machines and scattered containers sleep under a blanket of snow — a lonely workshop standing against the wide horizon.

The challenge is simple: Find out exactly where this photograph was taken, Submit the coordinates of this location up to three decimal places

Example: IEEE{30.089, 31.318}
```

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/map.png)

In this image, we have two clues:

1. Characteristics of the place says that it's on `Alaska’s North Slope`
2. The interesting building with numbers on the right.

By image-searching we see an exact match of the building, it belongs to `CONAM Construction Company`

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/image-search.png)

Visiting their History page on their [Official Website](https://www.conamco.com/about-us/history), we see this info

>In Alaska,  CONAM has enjoyed partnerships with Alaska Native Companies including CIRI, AHTNA, Tikigaq Corporation of Point Hope, KIC of Kotzebue, Kuukpik Corporation of Nuiqsut, and AMES1, LLC.


Now, we know that their project in Alaska is within `Point Hope`, so we go to our google maps and take a look on that place

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/Point-Hope.png)

Using Street View, we search inch-by-inch till we see this:

![alt text](/assets/images/Write-Ups/victoris4_OSINT_Quals/street-view.png)

Flag: <span style="color:#0056D2;">**IEEE{68.347,-166.745}**</span>

___
___

<p align="center"><span style="color:#0056D2;">THE END</span></p>


___
___