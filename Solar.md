### General

The SM100 (and SM200) is a device to enhance Buderus heating with the ability to earn solar energy using solar collectors and spend these energy into a water reservoir.
There are different scenarios available to add these module into a heating.

Protocol: The SM100 device communicates using the EMS+ protocol. That means it sends and interprets EMS and also EMS+ messages.

External Link to the german product page of SM100: https://www.buderus.de/de/produkte/catalogue/alle-produkte/7607_solarmodul-logamatic-sm100

The following reverse protocol engineering based on a Buderus GB172 heating combined with a water reservoir in one heating circuit. Other combinations, configurations and protocol types are not covered.

Also refer to https://github.com/proddy/EMS-ESP/issues/267 for the SM200

### Decoded EMS+ Messages

How to interpret the tables below. Take an example telegram:

```
       EMS+ telegram type
          ->|   |<-
30 00 FF 00 02 62 01 FB 01 9E 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 80 00 2B
   data block --> 00 01 02 03 04 06 07 08 09 0A...
                  ^
                  |
             start of data
```

The data starts at the 7th byte straight after the typeID - here `x0262`. Position 0 is the first byte of the data block.

### Telegram overview

| EMS+ telegram type | description           | schedule     | number of data bytes in decimal |
| ------------------ | --------------------- | ------------ | ------------------------------- |
| x0262              | Temperatures          | every minute | 26 (max. 24 in one telegram)    |
| x0263              | unknown               | every minute | 12                              |
| x0264              | Solar pump modulation | every minute | 17                              |
| x0266              | unknown               | every minute | 04                              |
| x0268              | unknown               | every minute | 02                              |
| x026A              | Solar pump on/off     | every minute | 12                              |
| x028E              | Solar energy earnings | every hour   | 15                              |

### Telegram details

| Telegram type | data position (0..n) in decimal | description                                            | format  |
| ------------- | ------------------------------- | ------------------------------------------------------ | ------- |
| x0262         | 0+1                             | T1 - Temperature of solar collector `[°C]`             | 2 bytes |
| x0262         | 2+3                             | T2 - Temperature of bottom water reservoir 1 `[°C]`    | 2 bytes |
| x0262         | 16+17                           | T5 - Temperature of bottom water reservoir 2 `[°C]`    | 2 bytes |
| x0264         | 9                               | Solar pump modulation `[%]`                            | 1 byte  |
| x026A         | 10                              | PS1 - Solar pump: on=`04` and off=`03`                 | 1 byte  |
| x026A         | 4                               | VS2 - Cylinder select value: cyl#2=`04` and cyl#1=`03` | 1 byte  |
| x028E         | 0+1+2+3                         | Solar energy earning last hour `/10` `[Wh]`            | 4 byte  |
| x028E         | 4+5+6+7                         | Solar energy earning today `[Wh]`                      | 4 byte  |
| x028E         | 8+9+10+11                       | Solar energy earning total `/10` `[kWh]`               | 4 byte  |

### Examples

Solar pump status and changes:

1.Status solar pump is currently off: see x026A data byte 0A "03" and x0264 data byte 9 "00"

```
 SM -> all, type 0x026A telegram: 30 00 FF 00 02 6A 03 03 03 00 03 03 03 03 03 00 03 03 (CRC=E5), #data=11
 SM -> all, type 0x0264 telegram: 30 00 FF 00 02 64 00 00 00 04 00 00 FF 00 00 00 0C 0A 64 00 00 00 00 (CRC=53), #data=16
```

2.Status pump is currently on: see x026A data byte 0A "04" and x0264 data byte 9 "1E"

```
 SM -> all, type 0x026A telegram: 30 00 FF 00 02 6A 03 03 03 00 03 03 03 03 03 00 04 03 (CRC=EB), #data=11
 SM -> all, type 0x0264 telegram: 30 00 FF 00 02 64 00 00 00 04 00 00 FF 00 00 1E 09 08 64 00 00 00 00 (CRC=CD), #data=16
```

3.Solar pump changes from off --> on: see x0264 data byte 9 set at first to "64" and x026A byte 0A is set to "04"

```
 SM -> all, type 0x0264 telegram: 30 00 FF 09 02 64 64 (CRC=37)
 SM -> all, type 0x026A telegram: 30 00 FF 0A 02 6A 04 (CRC=53)

Less then 10 seconds later the pump is throttled to `30%` 0x1E

 SM -> all, type 0x0264 telegram: 30 00 FF 09 02 64 1E (CRC=4D)
```

4.Solar pump changes from on --> off: see x0264 data byte 9 set to "00" and x026a byte 0A is set to "03"

```
 SM -> all, type 0x0264 telegram: 30 00 FF 09 02 64 00 (CRC=53)
 SM -> all, type 0x026A telegram: 30 00 FF 0A 02 6A 03 (CRC=54)
```

Solar energy earnings:

```
 SM -> all, type 0x028E telegram: 30 00 FF 00 02 8E 00 00 0C F3 00 00 06 02 00 00 76 33 (CRC=8A), #data=11
```
