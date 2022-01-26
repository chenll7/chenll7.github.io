---
title: 比特币笔记
date: '2020-11-01 11:36:09'
updated: '2021-06-12 08:01:41'
categories:
  - 1 Blockchain
---
# 比特币笔记

## 比特币地址

　　比特币使用Secp256k1椭圆曲线得到私钥、公钥。

　　公钥哈希是公钥进行HASH160（SHA256、RIPEMD160）而来的，为了方便阅读，再对公钥哈希使用BASE58CHECK编码成地址来显示。但是账本上是不会出现“地址”，只会出现公钥（解锁脚本里）和公钥哈希（锁定脚本里）。

　　地址是公钥哈希或者脚本哈希进行check58num或者bech32编码后的结果。

## 交易

### 非coinbase交易

　　![](Bitcoin_Notes/比特币交易结构.png)

　　交易中的script可以看做是一个下推自动机的的形式语言，用来对栈进行存取和处理。

### coinbase交易

　　coinbase交易中的输入结构和普通交易不一样。

### 交易结构中的lock_time

　　交易中的lock_time指示这笔交易在哪个时间才可以出现在链上。

### minrelaytxfee

　　一个节点有minrelaytxfee参数，现在版本默认为0.00001btc，可以修改，交易费低于minrelaytxfee的交易不会被转发。

### 交易延展性（transaction malleability）

参考：

- <https://bitcoincore.org/en/2016/01/26/segwit-benefits/> 
- <https://en.bitcoin.it/wiki/Transaction_malleability>


　　隔离见证可以解决交易延展性（transaction malleability）。

　　交易发送方可以将签名好的交易发送给比特币网络，并且可以计算出这笔交易的txid（用HASH256，即两次SHA256）。txid是交易在链上的唯一标志。

　　但是在交易进入共识链之前，被转发或者被矿工处理的过程中，内容可以被改变（但无法改变输入和输出），造成txid被改变。交易发送方无法按txid追索到自己发的交易。这称为第三方延展性（third-party malleability）。

### 签名延展性（Signature Malleability）

　　交易的输入中的每个输入的解锁脚本中有签名（ECDSA算法生成），攻击者可以在不掌握交易发送方的私钥（这个输入引用的输出的锁定脚本中的公钥哈希对应的私钥）的情况下重构一个不一样的但是合法的签名，造成txid的改变。主要原因是openssl不要求签名严格遵循DER-encoded ASN.1标准，BIP66软分叉要求签名严格遵守DER-encoded ASN.1标准以避免这个问题（看了DER编码和椭圆曲线，但是没大懂）。

　　采用隔离验证形式的新式交易将签名移到交易的script_witnesses字段，避免了这个问题。

### 解锁脚本延展性（scriptSig Malleability）

> 　　The signature algorithm used in Bitcoin does not sign any of the scriptSig to create the signature. While signing the whole scriptSig would be impossible - the signature would be signing itself - this does mean that additional data can be added such that it will be pushed on the stack prior to the required signatures and public keys. Similarly OP_DROP can be added to leave the stack exactly as before prior to scriptPubKey execution.

> 　　Preventing scriptSig malleability is being considered as well. Currently transactions with anything other than data push operations in their scriptSig are considered non-standard and are not relayed, and eventually this rule may extend to enforcing that the stack have exactly one item after execution. However doing that may interfere with later extensions to Bitcoin.

　　（不太理解，直接翻译了）比特币的签名算法不会对任何一个解锁脚本创建签名。尽管对整个解锁脚本签名是不可能的，签名会对自己进行签名，这意味着额外的数据可以被添加。额外的数据将会被推到栈（脚本运行时的用的栈）的被需要的签名和公钥前面。相似地，OP_DROP可以被添加，造成栈在解锁脚本执行之前恰好如之前的情况一样（？？？）。

　　如何防止解锁脚本延展性也正在被考虑。现在，解锁脚本里有除了push操作以外的操作的交易是不标准的，也不会被转发。以后这个规则可能会扩展到强制栈必须在执行完后恰好只有一个元素。然而做这个可能性向比特币之后的扩展性。
　　
## 隔离见证（segregated witness）

参考：
- <https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki>
- <https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki>

　　隔离见证（BIP141-BIP145描述）是软分叉。

　　隔离见证将交易格式从

```
[nVersion][txins][txouts][nLockTime]
```

改成了

```
[nVersion][marker][flag][txins][txouts][witness][nLockTime]
```

![](Bitcoin_Notes/20190302101503.png)

其中，maker和flag的目的是为了与老的交易区别，对于老的节点来说，新交易看起来是0输入的交易。原因见BIP144。

　　witness字段由一个或者多个witness field组成，每一个输入（txin）对应一个witness field。每个witness field开头有个字节var_int表示要在脚本执行前在栈里预先压入几个东西。witness不是脚本。witness field里主要是签名和公钥。

　　BIP141提供了两种新的交易类型P2WPKH（向隔离见证公钥哈希付款）和P2WSH（向隔离见证脚本付款）。
