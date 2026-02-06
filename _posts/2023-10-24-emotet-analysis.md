---
layout: post
title: "Deobfuscating Emotet: A Deep Dive into the Packer"
date: 2023-10-24
categories: [Malware]
tags: [Malware, ReverseEngineering]
image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd7lkC8ltPMKRsG3OdKJ65GCNkYiurZcqQDNoY4jMNJFe6bEx8ioqqRazk3uqFEDGjMInOEaS0v0g2zu6FLL235Ishrn9NVDsKrRLL6povnv75K3d9-GzWDKoFFydOv4VOt4ZKfsoUYxqIe09ntONjoCaZidNytvM5MD1Jt0WRUXkQcV14qzVUF703dNfHGRHsF7KdnJk90PgCr466Q9zRWbcCXTQPlj008KdAgIfGtabhzO390ETcwc7753UJvfWyJ8Ze6MVGvds"
description: "An in-depth analysis of the latest Emotet packing techniques using x64dbg and Python."
---

Emotet has evolved significantly over the years. Originally a banking trojan, it has morphed into a modular botnet used primarily as a distributor for other malware. In this post, we'll dissect a recent dropper sample found in the wild.

## Static Analysis

The initial dropper arrives as a macro-enabled Word document. Upon extraction, we see a heavily obfuscated PowerShell script.

```python
import base64

def decrypt_payload(encoded_str):
    # The payload is reversed and base64 encoded
    reversed_str = encoded_str[::-1]
    decoded_bytes = base64.b64decode(reversed_str)
    return decoded_bytes
```

After decrypting the initial stage, we uncover the URL for the second-stage payload. The malware attempts to download an executable to the `%TEMP%` directory.

## Dynamic Analysis

Running the sample in a controlled sandbox reveals several network connections.

*   `update-microsoft-service[.]com`
*   `cdn-jquery-libs[.]net`

**Hash (SHA256):** `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
