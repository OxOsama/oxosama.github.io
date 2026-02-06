---
title: "CTF@CIT_REV"
classes: wide
header:
  teaser: /assets/images/Covers/CTF@CIT_REV_Logo.jpg
ribbon:   DarkRed
description: "Write-up for 2 Reverse challenges from the annual World-Wide CTF@CIT."
categories:
  - Write-Ups
toc: true
---

# **CTF@CIT!**

Hello Everyone!<br>
I recently participated in the CTF@CIT, which was a really fun experience, and I managed to secure the 18th place with my team `L0ck8y7e` among other 950 teams around the world, As for me, I solved 11 challenges distributed among `MISC`, `Steganography`, `OSINT` and `Reverse`.

In this Write-up, I'll continue in the reverse side.

![Team_rank](/assets/images/Write-Ups/CTF@CIT2025/team.png)

# Read Only

![Read_Only_image](/assets/images/Write-Ups/CTF@CIT2025/Read_Only_image.png)

This is very straightforward, as the name says, all we need to do is to read the strings, I used the `strings` command and piped it to `grep` to extract the flag in one step, and **Voilà**, here is our flag.

![Strings](/assets/images/Write-Ups/CTF@CIT2025/strings.png)

Flag: <span style="color:#00FFFF;">**CIT{87z1BjG1968G}**</span>

___


# Serpent

![alt text](/assets/images/Write-Ups/CTF@CIT2025/Serpent_image.png)

This file is a full obfuscated Python code that uses dumb names for its variables and functions and has lots of tricky math and character combinations, so let us take it step by step deobfuscating this script manually

***You can use AI of course — but where’s the fun in that?***

## Simplify math

There are lots of very long math computations in the script, but in fact, each one represents only a constant, here is an example:

```py
llllIlIlllIl = int(llIlIllIlIII[:int(((((116704136061.60963/964.3201898193925)/(0.428703923838846*886.9237724388992))/((0.0012060833880980187*881.8443963774392)*(130182.98979848581/481.8732951395559)))/(((29522.745228631833/649.7570061320558)/(1.4324981093115086*335.8825456577037))*((0.0017319883848935607*805.3839972167189)*(3.356677032714075*156.57728970259043)))))], int(((((5390772.534752933/864.0296058875497)/(26.83148167401528*27.364792970405322))/((0.0005708733226711018*740.6357840296969)*(102.92500351553784*9.678895359212218)))*(((14416.339800419119/546.3940490550166)*(0.6100297608738964*928.6839910352614))/((42.6015599384457*363.2887585003947)/(63167.78456455019/76.92378917865454))))))

```

After calculating the two equations, the code will be:

```py
llllIlIlllIl = int(llIlIllIlIII[:16], 16)
```

Now, we can apply this to the entire code to make it more simple.

## Renaming dummy names
Now, we have 6 functions and a class, the first one is:

```py
def IlIIIlIIIIIlI(llIIIlIIlIIll: str) -> int:
    llIlIllIlIII = hashlib.sha256(llIIIlIIlIIll.encode()).hexdigest()
    llllIlIlllIl = int(llIlIllIlIII[:16], 16)
    IlIlIIlIlII = ((llllIlIlllIl >> 3) ^ 0x5F5F5F5F) % 0xFFFFFFFF
    return IlIlIIlIlII
```

This function takes a string as input and returns a deterministic pseudo-random 32-bit integer based on that string, so we can re write it as :

```py
def generate_seed(input_str: str) -> int:
    hash_hex = hashlib.sha256(input_str.encode()).hexdigest()
    first_16_chars = int(hash_hex[:16], 16)
    number = ((first_16_chars >> 3) ^ 0x5F5F5F5F) % 0xFFFFFFFF
    return number
```

Next we have the following function:

```py
def IIllIIIllIIlIIIIlIl(value: int, IIIllIIllllIII: int) -> int:
    if IIIllIIllllIII <= 0:
        return value
    llIllIIllIIlII = ((value * 7 ) ^ (value >> 2)) & 0xFFFFFFFF
    return IIllIIIllIIlIIIIlIl(llIllIIllIIlII + IIIllIIllllIII, IIIllIIllllIII - 1)
```
This function Recursively transforms the input value by applying a custom formula for a specified number of iterations, so we can rewrite it as:

```py
def recursive_transform(value: int, iterations : int) -> int:
    if iterations  <= 0:
        return value
    transformed_value  = ((value * 7) ^ (value >> 2)) & 0xFFFFFFFF
    return recursive_transform(transformed_value  + iterations , iterations  - 1)
```

Now we have a class that contains 4 functions:

```py
class Transformer:
    def __init__(self, lIllIlIIIlIII: int):
        self.lIllIlIIIlIII = lIllIlIIIlIII
    def lIIllllIIllI(self) -> str:
        lIllIIIlIlIIlIlIlII = math.sin(self.lIllIlIIIlIII % 360)
        IIlIlIlIIlIIlI = f"{abs(int(lIllIIIlIlIIlIlIlII * 10000)):08d}"
        return IIlIlIlIIlIIlI
    def IIIlIIlIIlIl(self, IIIllIIlII: str) -> str:
        lIIllIIlIllIll = 42
        IIIlIIIlllIIlII = "".join(chr((ord(c) ^ lIIllIIlIllIll) & 0xFF) for c in IIIllIIlII)
        IllllIIllIIl = base64.b64encode(IIIlIIIlllIIlII.encode()).decode()
        return IllllIIllIIl
    def IlIIIllIlIlIlI(self, IllllIIllIIl: str) -> int:
        IIIIIIlIlIllII = hashlib.md5(IllllIIllIIl.encode())
        lIlIlllllIllI = IIIIIIlIlIllII.hexdigest()
        return int(lIlIlllllIllI[:8], 16)
```

This transformer applies a series of transformations to an integer input:
  1. Converts it using the sine function.
  2. Applies XOR encoding and Base64 encoding.
  3. Hashes the result with MD5 and extracts a portion of it.

So, the clean version of it could be like this:

```py
class Transformer:
    def __init__(self, value: int):
        self.value = value
    def transform_step1(self) -> str:
        sine_value  = math.sin(self.value % 360)
        scaled_value  = f"{abs(int(sine_value  * 100000000)):08d}"
        return scaled_value 
    def transform_base64_encoded(self, step1: str) -> str:
        xor_key  = 42
        xor_encoded = "".join(chr((ord(c) ^ xor_key ) & 0xFF) for c in step1)
        base64_encoded = base64.b64encode(xor_encoded.encode()).decode()
        return base64_encoded
    def transform_step3(self, base64_encoded: str) -> int:
        md5_hash  = hashlib.md5(base64_encoded.encode())
        hex_digest = md5_hash .hexdigest()
        return int(hex_digest[:8], 16)
```


After the class, we have another 4 functions, this is the first:

```py
def IIllIllIIIIIIlIl(values: list) -> str:
    IlIlIIllIl = sum(values)
    IlIlIIllIl ^= 0xABCDEF
    lIlIIIlllIIIllIII = 0
    for digit in str(IlIlIIllIl):
        lIlIIIlllIIIllIII = (lIlIIIlllIIIllIII * 31 + int(digit)) & 0xFFFFFFFF
    IlIlIIlIIIlllIl = hex(lIlIIIlllIIIllIII)[2:]
    lllIllIIlI = base64.b64encode(IlIlIIlIIIlllIl.encode())
    IlIIIIlIlIIll = lllIllIIlI.decode()[:16]
    IlIIIIlIlIIll = IlIIIIlIlIIll.rjust(16, chr(48))
    return IlIIIIlIlIIll
```

This code sums the list, applies XOR, performs a custom hash-like transformation, encodes the result with Base64, and formats it to a 16-character string, so we can rewrite it as:

```py
def generate_final_token(values: list) -> str:
    total  = sum(values)
    total  ^= 0xABCDEF
    hashed_value  = 0
    for digit in str(total ):
        hashed_value  = (hashed_value  * 31 + int(digit)) & 0xFFFFFFFF
    hex_str = hex(hashed_value )[2:]
    base64_encoded = base64.b64encode(hex_str.encode())
    final_token  = base64_encoded.decode()[:16]
    final_token  = final_token.rjust(16, chr(48))
    return final_token 
```

Then we have these 2 functions:

```py
def lIllIlIIlIlllllIllll() -> str:
    llIIIlIIlIIll = "S3cr3tS33d_For_CTFC0mp"
    llIIllIIll = IlIIIlIIIIIlI(llIIIlIIlIIll)
    llIIlIllIIllIIIIll = IIllIIIllIIlIIIIlIl(llIIllIIll, IIIllIIllllIII=10)
    llIIIIIIlIIllll = Transformer(llIIlIllIIllIIIIll)
    IIIllIIlII = llIIIIIIlIIllll.lIIllllIIllI()
    IllllIIllIIl = llIIIIIIlIIllll.IIIlIIlIIlIl(IIIllIIlII)
    IIIllIIlIII = llIIIIIIlIIllll.IlIIIllIlIlIlI(IllllIIllIIl)
    IlIIIIIlIIIIlIIIIIII = (int(hashlib.sha1(IllllIIllIIl.encode()).hexdigest()[:8], 16)) & 0xFFFF
    llllllIIlIlIIIIlI = IIllIllIIIIIIlIl([llIIllIIll, llIIlIllIIllIIIIll, IIIllIIlIII, IlIIIIIlIIIIlIIIIIII])
    return llllllIIlIlIIIIlI
def IIIIlIIlIll(val: str) -> str:
    lIIlIIlllIllllllIIll = 7
    IlIlIlIIllIIIl = []
    for c in val:
        IlIlIlIIllIIIl.append(chr(((ord(c) - 48 + lIIlIIlllIllllllIIll) % 75) + 48))
    return "".join(IlIlIlIIllIIIl)
```

Now, in this code the first function executes a series of transformations on a predefined input string `S3cr3tS33d_For_CTFC0mp` and returns the final processed result, then the second one shifts each character in its input by +7, modulo 75, inside a printable range, It's a simple obfuscation or encoding technique.

now we can rewrite it like that:

```py
def function_4() -> str:
    input_str = "S3cr3tS33d_For_CTFC0mp"
    initial_seed  = generate_seed(input_str)
    transformed_seed  = recursive_transform(initial_seed , iterations =10)
    transformer  = Transformer(transformed_seed )
    step1 = transformer.transform_step1()
    base64_encoded = transformer.transform_base64_encoded(step1)
    step3 = transformer.transform_step3(base64_encoded)
    partial_hash  = (int(hashlib.sha1(base64_encoded.encode()).hexdigest()[:8], 16)) & 0xFFFF
    final_result  = generate_final_token([initial_seed , transformed_seed , step3, partial_hash ])
    return final_result 
def function_5(val: str) -> str:
    key = 7
    str2 = []
    for c in val:
        str2.append(chr(((ord(c) - 48 + key) % 75) + 48))
    return "".join(str2)
```

The next one is the main function, which looked like that after simplify its math and characters calculation :

```py
def IllIlllIIllIlIIIIIlI():
    IllIlllIIlll = lIllIlIIlIlllllIllll()
    lllIIIllIllII = IIIIlIIlIll(IllIlllIIlll)
    llIlIIIIIlllIIll = "".join("CIT{")
    IllIIIllllIlII ="".join("}")
    lIIlllllIl = llIlIIIIIlllIIll + lllIIIllIllII + IllIIIllllIlII
if __name__ == "__main__":
    IllIlllIIllIlIIIIIlI()
```

which can be cleaned to:

```py
def main():
    var1 = function_4()
    var2 = function_5(var1)
    var3 = "CIT{"
    var4 = "".join("}")
    var5 = var3 + var2 + var4
if __name__ == "__main__":
    main()
```

Now that we have a clear deobfuscated code that we understand how it works, we can run it and even edit it.

When we run the code, nothing happends, that is because the concatenated string `CIT{` + `Encoded string` + `}` which is made in the main didn't get printed, so adding this print line at the end of the main will result in printing the flag:

```py
print(var5)
```

Flag: <span style="color:#00FFFF;">**CIT{7777aKMpU9X3TqnD}**</span>



___
___

<p align="center"><span style="color:#00FFFF;">THE END</span></p>


___
___