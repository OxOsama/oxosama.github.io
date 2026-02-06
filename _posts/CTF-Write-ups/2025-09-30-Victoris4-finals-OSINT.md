---
title: "OSINT Writeup — IEEE VICTORIS4 CTF Finals"
classes: wide
header:
  teaser: /assets/images/Covers/victoris4-finals.png
ribbon:   RoyalBlue
description: "After a full 6 hours in the `IEEE VICTORIS4 CTF` finals phase, I’m happy to share my write-up for three OSINT challenges I created: two Investigations (*Easy/Medium*) and one Geo (*Hard*), this is a step-by-step walkthrough aimed at beginners."

categories:
  - Write-Ups
toc: true
---

## <span style="color:#0056D2;">**Introduction**</span>

After a full 6 hours in the `IEEE VICTORIS4 CTF` finals phase, I’m happy to share my write-up for three OSINT challenges I created: two Investigations (*Easy/Medium*) and one Geo (*Hard*).

This is a step-by-step walkthrough aimed at beginners.  

---

## <span style="color:#0056D2;">**Domains of Deception**</span>


>### Description
>
>Whispers spread across the net: a phantom domain-smith forging shadows of giants.
His masterpiece? rnicrosoft[.]com — a false mirror of trust, luring the careless.
One careless step led hunters to his trail.
>
>Follow the traces. Unmask the trickster. Gather his secrets.
>
>### Flag parts:
>⦁	First part (scammer name): the scammer’s real full name.
>
>⦁	Second part (oldest domain): of the >16,390 domains registered under the scammer’s name, identify the oldest domain registration (domain string only, e.g. example[.]com).
>
>⦁	Third part (leaks): how many data leaks (leaked datasets) were found associated with the scammer’s accounts? (a numeric count)
>
>***Bounus: If you recover a password from the leaked data, submit it as an optional fourth Bounus token.***
>
>### Flag format:
>
> IEEE{Real_Name,oldest.domain,Leakcount}



First, we need the `Scammer's name` so we open [WHOIS Domain Lookup](https://www.whois.com/whois/rnicrosoft.com) and search with the domain name, now we know who is the Registrant a.k.a. `Scammer` and also some extra useful info about him.

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/WHOIS.png)

Now, we know that he has over 16,390 domains registered under his name,
with that much records, if we went to [whoisology.com](https://whoisology.com/name/park%20hyungjin/1) and searched with the Registrant name `Park HyungJin`, we will get a partial list of records, but those records aren't in order and we will have to search for the Creation Date manually in all of them.

After some search, we find this [website](https://www.bigdomaindata.com/reverse-whois/) that offers the full list with a price of `$25`, it also shows only 100 records without price as a free trial, so we clarify our search filter like this:

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/Search-filter.png)

Now we get this result for the oldest 100 records:

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/result.png)

***NOTE: You can also find it [here](https://whoisfreaks.com/tools/user/whois/reverse/search/owner/park%20hyungjin?exact=true&page=4#open-modal-0) but there is no guarantee the this is the oldest one, the records aren't in order***

Last part, we need to find numeric count of leaks that his email appeared in , so we open [HIBP](https://haveibeenpwned.com/) and search with his email `b2c@naver.com`, the result is `4.

For the Bounus part, we go to [BreachDirectory](https://breachdirectory.org/) and search for the email `b2c@naver.com`, we get this result:

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/breachdirectory.png)

Now we already have the first password `1111`. To get the other one we open any hash cracker and select the `sha1` algorithm and we get the second password:

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/hash-cracker.png)

***NOTE: you can also use this [tg bot](https://t.me/HaveIBeenHacked_Bot?start=BRqrTQe) made by [Kalawy](https://www.linkedin.com/in/mohamedwagdy72/) to get the passwords straightforward.***

Flag: <span style="color:#0056D2;">**IEEE{Park_HyungJin,wni.net,4}**</span>

Bounus: <span style="color:#0056D2;">**1111,379843aad2a2e3882c9c89a2f69ea2ddcc66bf55**</span>


___
___

## <span style="color:#0056D2;">**KA-SAT**</span>



>### Description
>In the dawn fog before battle, a pure evil rose, an evil that will touch the sky, the `KA-SAT` had been compromised, What began as legitimate commands became a destructive wiper.
>
>Investigate this breach using your OSINT and Threat-Intel skills.
>
>---
>
>### Flag Parts:
>
>1. Consumer brand of the affected service.
>2. The group responsible for the attack.
>3. CRC32-b hash of the only string this wiper writes.
>4. CRC32-b hash of all 8 targeted paths within the binary (comma separated, in the same order within the binary).
>
>**NOTE:** if the paths were: `/usr/bin/`, `/usr/sbin`, `/usr/tmp`, then the hash will be:
>
>
>>CRC32("/usr/bin/,/usr/sbin,/usr/tmp")
>
>
>---
>
>### Flag Format:
>
>>IEEE{name,group,string_crc32,paths_crc32}


First, a simple search will bring us to the official [incident report ](https://www.viasat.com/perspectives/corporate/2022/ka-sat-network-cyber-attack-overview/) from `Viasat`, the owner of the satellite, Now we know what was the incident.

Within the report we find the Consumer brand of the affected service mentioned here:

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/Tooway.png)

Now, we go to the [MITRE ATT&CK](https://attack.mitre.org/software/) software page and search for the incident, we can find it here with the name of the group `SandWorm` and also the wiper name `AcidRain`.

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/mitre-attack.png)

After knowing the wiper's name we can go to [Malware Bazaar](https://bazaar.abuse.ch/browse.php?search=tag%3AAcidRain) and search with the tag `AcidRain`, we see two samples, we download the oldest one matching the attack date and start analyzing.

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/malware-bazaar.png)

Submitting the sample to [Joe Sandbox](https://www.joesandbox.com/analysis/601024/0/html#overview), we can find the only string printed by searching the `Standard Output` field.

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/output.png)

Using [CyberChef](https://cyberchef.org/#recipe=CRC-32_Checksum()&input=TG9vayBvdXQh) with CRC-32, we get our third part of the flag `3f2d5b79`

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/first-hash.png)

For the last part, according to [Sentinel Labs](https://www.sentinelone.com/labs/acidrain-a-modem-wiper-rains-down-on-europe/) report, the targeted paths are hardcoded within the binary making it easy for an in-depth wipe of the filesystem and various known storage device files, so we only need to run `strings` on the binary to get them in order.

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/strings.png)

Now we have them:
- /dev/loopXX
- /dev/sdXX
- /dev/mtdXX
- /dev/mtdblockXX
- /dev/block/mtdblockXX
- /dev/mmcblkXX
- /dev/block/mmcblkXX

***NOTE: in the description, I asked for 8 targeted paths, there are only 7; I mistakenly counted `/dev/null` as a targeted path.***

So now, we format them as the description said, and we get this hash `a05e040f`

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/second-hash.png)

Flag: <span style="color:#0056D2;">**IEEE{Tooway,Sandworm,be408ebe,a05e040f}**</span>

___
___

## <span style="color:#0056D2;">**Sport**</span>



>### Description
>
>Nothing beats a good sports time. Find where I’m and the next match will be on me.
Provide the coordinates of the place rounded to 3 decimal places.
>
>### Flag format: *IEEE{LAT,LON}*
>
>### Example: *IEEE{36.806,10.181}*
>___

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/sports.png)

First with some image-searching and comparing similar images, the construction style strongly suggests this place is in `عين السبع بالمغرب`.

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/Aïn-Sebaâ.JPG)

We notice that there is a banner hanged on the playground wall's net, It has some Arabic words but we cann't read it clearly, this is a strong identication that Morocco is correct

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/1.png)

After some edit to the image and giving it to any AI agent, we can conclude that the phrase is `الفضاء الرياضي إقامة الشباب`, so we search on it on the maps and start search for any playgrounds in the found area till we find this:

![alt text](/assets/images/Write-Ups/victoris4_OSINT_finals/maps.png)

Opening the street view, we get these two images:

<iframe src="https://www.google.com/maps/embed?pb=!4v1759230992978!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJQzQycFdfSFE.!2m2!1d33.60667539097235!2d-7.522787284210762!3f63.10109864196937!4f20.212630032879858!5f0.4000000000000002" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


<iframe src="https://www.google.com/maps/embed?pb=!4v1759231019372!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHEtYnZpWXc.!2m2!1d33.60642747184831!2d-7.522331432069667!3f306.56927924820957!4f5.681927935590636!5f0.7820865974627469" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

This is our place.

Flag: <span style="color:#0056D2;">**IEEE{33.607,-7.523}**</span>

___
___

<p align="center"><span style="color:#0056D2;">THE END</span></p>


___
___