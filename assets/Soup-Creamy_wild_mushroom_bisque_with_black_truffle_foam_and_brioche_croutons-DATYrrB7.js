const G="data:text/markdown;base64,IyMgQ3JlYW15IFdpbGQgTXVzaHJvb20gQmlzcXVlIHdpdGggQmxhY2sgVHJ1ZmZsZSBGb2FtIGFuZCBCcmlvY2hlIENyb3V0b25zDQoNCiMjIyBJbmdyZWRpZW50cw0KDQojIyMjIEZvciB0aGUgTXVzaHJvb20gQmlzcXVlOg0KLSA1MDBnIGFzc29ydGVkIHdpbGQgbXVzaHJvb21zIChjaGFudGVyZWxsZXMsIG1vcmVscywgcG9yY2luaSkNCi0gMiB0YnNwIG9saXZlIG9pbA0KLSAxIG1lZGl1bSBzaGFsbG90LCBmaW5lbHkgY2hvcHBlZA0KLSAyIGNsb3ZlcyBnYXJsaWMsIG1pbmNlZA0KLSAyIHRic3AgdW5zYWx0ZWQgYnV0dGVyDQotIDc1MG1sIHZlZ2V0YWJsZSBzdG9jaw0KLSAxMjVtbCBoZWF2eSBjcmVhbQ0KLSAxIHNwcmlnIGZyZXNoIHRoeW1lDQotIDEgYmF5IGxlYWYNCi0gU2FsdCBhbmQgZnJlc2hseSBncm91bmQgYmxhY2sgcGVwcGVyIHRvIHRhc3RlDQoNCiMjIyMgRm9yIHRoZSBCbGFjayBUcnVmZmxlIEZvYW06DQotIDEwMG1sIG1pbGsgKHdob2xlIG1pbGsgcHJlZmVycmVkKQ0KLSAxIHRzcCBibGFjayB0cnVmZmxlIG9pbA0KLSBBIHBpbmNoIG9mIHNhbHQNCg0KIyMjIyBGb3IgdGhlIEJyaW9jaGUgQ3JvdXRvbnM6DQotIDQgc2xpY2VzIG9mIGJyaW9jaGUgYnJlYWQsIGN1dCBpbnRvIGN1YmVzDQotIDIgdGJzcCB1bnNhbHRlZCBidXR0ZXINCi0gMSBjbG92ZSBnYXJsaWMsIGNydXNoZWQNCi0gQSBwaW5jaCBvZiBzYWx0DQoNCiMjIyBJbnN0cnVjdGlvbnMNCg0KIyMjIyBQcmVwYXJpbmcgdGhlIE11c2hyb29tIEJpc3F1ZToNCjEuIENsZWFuIGFuZCByb3VnaGx5IGNob3AgdGhlIG11c2hyb29tcy4gSW4gYSBsYXJnZSBwb3QsIGhlYXQgb2xpdmUgb2lsIG92ZXIgbWVkaXVtLWhpZ2ggaGVhdC4gQWRkIG11c2hyb29tcyBhbmQgc2F1dMOpIHVudGlsIHRoZXkgcmVsZWFzZSBtb2lzdHVyZSBhbmQgc3RhcnQgdG8gYnJvd24sIGFib3V0IDUtNyBtaW51dGVzLg0KMi4gQWRkIHRoZSBzaGFsbG90cyBhbmQgZ2FybGljIHRvIHRoZSBwb3QsIGFuZCBjb29rIHVudGlsIHRoZSBzaGFsbG90cyBiZWNvbWUgdHJhbnNsdWNlbnQuDQozLiBTdGlyIGluIHRoZSBidXR0ZXIsIGFsbG93aW5nIGl0IHRvIG1lbHQsIGFuZCB0aGVuIGFkZCB0aGUgdmVnZXRhYmxlIHN0b2NrLiBTdGlyIHdlbGwgdG8gY29tYmluZS4NCjQuIEFkZCB0aGUgdGh5bWUgYW5kIGJheSBsZWFmLiBCcmluZyB0aGUgbWl4dHVyZSB0byBhIGJvaWwsIHRoZW4gcmVkdWNlIHRoZSBoZWF0IHRvIGxvdywgY292ZXIsIGFuZCBzaW1tZXIgZm9yIGFib3V0IDIwIG1pbnV0ZXMuDQo1LiBSZW1vdmUgdGhlIHRoeW1lIHNwcmlnIGFuZCBiYXkgbGVhZi4gVXNlIGFuIGltbWVyc2lvbiBibGVuZGVyIHRvIHB1csOpZSB0aGUgc291cCB1bnRpbCBzbW9vdGguIFN0aXIgaW4gdGhlIGhlYXZ5IGNyZWFtIGFuZCBzZWFzb24gd2l0aCBzYWx0IGFuZCBwZXBwZXIgdG8gdGFzdGUuIEtlZXAgd2FybS4NCg0KIyMjIyBQcmVwYXJpbmcgdGhlIEJsYWNrIFRydWZmbGUgRm9hbToNCjEuIEluIGEgc21hbGwgc2F1Y2VwYW4sIHdhcm0gdGhlIG1pbGsgb3ZlciBsb3cgaGVhdCB1bnRpbCBzdGVhbSBiZWdpbnMgdG8gcmlzZS4gRG8gbm90IGxldCBpdCBib2lsLg0KMi4gUmVtb3ZlIGZyb20gaGVhdCBhbmQgc3RpciBpbiB0aGUgYmxhY2sgdHJ1ZmZsZSBvaWwgYW5kIHNhbHQuDQozLiBVc2UgYSBtaWxrIGZyb3RoZXIgdG8gZm9hbSB0aGUgbWlsayB0byBhIGxpZ2h0LCBhaXJ5IHRleHR1cmUuIFNldCBhc2lkZS4NCg0KIyMjIyBNYWtpbmcgdGhlIEJyaW9jaGUgQ3JvdXRvbnM6DQoxLiBQcmVoZWF0IHRoZSBvdmVuIHRvIDE4MMKwQyAoMzUwwrBGKS4NCjIuIEluIGEgc2tpbGxldCwgbWVsdCB0aGUgYnV0dGVyIG92ZXIgbWVkaXVtIGhlYXQgYW5kIGFkZCB0aGUgY3J1c2hlZCBnYXJsaWMuIEFsbG93IHRoZSBnYXJsaWMgdG8gaW5mdXNlIHRoZSBidXR0ZXIgZm9yIGFib3V0IDIgbWludXRlcywgdGhlbiByZW1vdmUgZnJvbSBoZWF0Lg0KMy4gVG9zcyB0aGUgYnJpb2NoZSBjdWJlcyBpbiB0aGUgZ2FybGljLWluZnVzZWQgYnV0dGVyIHVudGlsIGV2ZW5seSBjb2F0ZWQuDQo0LiBTcHJlYWQgdGhlIGN1YmVzIG9uIGEgYmFraW5nIHNoZWV0IGFuZCBiYWtlIGZvciAxMC0xNSBtaW51dGVzIG9yIHVudGlsIGdvbGRlbiBhbmQgY3Jpc3B5LiBUdXJuIGhhbGZ3YXkgZm9yIGV2ZW4gYnJvd25pbmcuDQoNCiMjIyBQbGF0aW5nDQoxLiBMYWRsZSB0aGUgbXVzaHJvb20gYmlzcXVlIGludG8gaW5kaXZpZHVhbCBzZXJ2aW5nIGJvd2xzLg0KMi4gU3Bvb24gYSBnZW5lcm91cyBtb3VuZCBvZiBibGFjayB0cnVmZmxlIGZvYW0gb24gdG9wIG9mIHRoZSBiaXNxdWUuDQozLiBHYXJuaXNoIHdpdGggYnJpb2NoZSBjcm91dG9ucyBhbmQgYW4gb3B0aW9uYWwgZHJpenpsZSBvZiB0cnVmZmxlIG9pbCBmb3IgZXh0cmEgYXJvbWEuDQo0LiBTZXJ2ZSBpbW1lZGlhdGVseSwgcGFpcmVkIHdpdGggYSBnbGFzcyBvZiBQaW5vdCBOb2lyIEtvc3RhIEJyb3duZSBSdXNzaWFuIFJpdmVyIFZhbGxleSAyMDE4IGZvciBhIHBlcmZlY3QgY3VsaW5hcnkgaGFybW9ueS4NCg0KRW5qb3kgeW91ciBzb3BoaXN0aWNhdGVkIENyZWFteSBXaWxkIE11c2hyb29tIEJpc3F1ZSwgcmV2ZWFsaW5nIGxheWVycyBvZiByaWNoIGVhcnRoeSBmbGF2b3JzIGFuZCBhcm9tYXRpYyB0cnVmZmxlcy4=";export{G as default};
