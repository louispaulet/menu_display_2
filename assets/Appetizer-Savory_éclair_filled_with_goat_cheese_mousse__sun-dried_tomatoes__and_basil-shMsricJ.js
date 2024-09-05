const G="data:text/markdown;base64,IyMgU2F2b3J5IMOJY2xhaXIgd2l0aCBHb2F0IENoZWVzZSBNb3Vzc2UsIFN1bi1kcmllZCBUb21hdG9lcywgYW5kIEJhc2lsDQoNCiMjIyBJbmdyZWRpZW50cw0KDQojIyMjIEZvciB0aGUgw4ljbGFpciBQYXN0cnkNCi0gMS8yIGN1cCAoMTIwIG1sKSB3YXRlcg0KLSAxLzQgY3VwICg2MCBnKSB1bnNhbHRlZCBidXR0ZXIsIGN1YmVkDQotIDEvMiB0ZWFzcG9vbiBzYWx0DQotIDEvMiBjdXAgKDY1IGcpIGFsbC1wdXJwb3NlIGZsb3VyDQotIDIgbGFyZ2UgZWdncywgbGlnaHRseSBiZWF0ZW4NCg0KIyMjIyBGb3IgdGhlIEdvYXQgQ2hlZXNlIE1vdXNzZQ0KLSA1IG96ICgxNDAgZykgZnJlc2ggZ29hdCBjaGVlc2UsIHJvb20gdGVtcGVyYXR1cmUNCi0gMS80IGN1cCAoNjAgbWwpIGhlYXZ5IGNyZWFtDQotIDEgdGFibGVzcG9vbiBob25leQ0KLSBTYWx0IGFuZCBwZXBwZXIgdG8gdGFzdGUNCg0KIyMjIyBGb3IgdGhlIEZpbGxpbmcNCi0gMS80IGN1cCBzdW4tZHJpZWQgdG9tYXRvZXMsIGZpbmVseSBjaG9wcGVkDQotIEEgaGFuZGZ1bCBvZiBmcmVzaCBiYXNpbCBsZWF2ZXMsIHRoaW5seSBzbGljZWQNCi0gT2xpdmUgb2lsIGZvciBkcml6emxpbmcNCg0KIyMjIEluc3RydWN0aW9ucw0KDQojIyMjIE1ha2luZyB0aGUgw4ljbGFpciBQYXN0cnkNCjEuICoqUHJlaGVhdCBPdmVuKio6IFByZWhlYXQgeW91ciBvdmVuIHRvIDQwMMKwRiAoMjAwwrBDKS4gTGluZSBhIGJha2luZyBzaGVldCB3aXRoIHBhcmNobWVudCBwYXBlci4NCg0KMi4gKipQcmVwYXJlIENob3V4Kio6IEluIGEgbWVkaXVtIHNhdWNlcGFuLCBjb21iaW5lIHdhdGVyLCBidXR0ZXIsIGFuZCBzYWx0LiBCcmluZyB0byBhIGJvaWwgb3ZlciBtZWRpdW0gaGVhdCwgZW5zdXJpbmcgYnV0dGVyIGlzIGNvbXBsZXRlbHkgbWVsdGVkLg0KDQozLiAqKkluY29ycG9yYXRlIEZsb3VyKio6IFJlbW92ZSBmcm9tIGhlYXQgYW5kIGFkZCBmbG91ciBhbGwgYXQgb25jZS4gUmV0dXJuIHRvIGhlYXQsIHN0aXJyaW5nIHZpZ29yb3VzbHkgd2l0aCBhIHdvb2RlbiBzcG9vbiB1bnRpbCBtaXh0dXJlIGZvcm1zIGEgYmFsbCB0aGF0IHB1bGxzIGF3YXkgZnJvbSB0aGUgc2lkZXMgb2YgdGhlIHBhbi4NCg0KNC4gKipDb29sICYgQmVhdCBJbiBFZ2dzKio6IFRyYW5zZmVyIGRvdWdoIHRvIGEgbWl4aW5nIGJvd2wgYW5kIGxldCBjb29sIHNsaWdodGx5LiBBZGQgZWdncywgYSBsaXR0bGUgYXQgYSB0aW1lLCBiZWF0aW5nIHdlbGwgYWZ0ZXIgZWFjaCBhZGRpdGlvbiwgdW50aWwgdGhlIGRvdWdoIGlzIHNtb290aCBhbmQgZ2xvc3N5Lg0KDQo1LiAqKlBpcGUgUGFzdHJ5Kio6IFRyYW5zZmVyIGRvdWdoIHRvIGEgcGlwaW5nIGJhZyBmaXR0ZWQgd2l0aCBhIGxhcmdlIHBsYWluIG5venpsZS4gUGlwZSAyLTMgaW5jaCBsb2dzIG9udG8gdGhlIHByZXBhcmVkIGJha2luZyBzaGVldCwgbGVhdmluZyBzcGFjZSBiZXR3ZWVuIGVhY2guDQoNCjYuICoqQmFrZSDDiWNsYWlycyoqOiBCYWtlIGZvciAxNSBtaW51dGVzLCB0aGVuIHJlZHVjZSBvdmVuIHRlbXBlcmF0dXJlIHRvIDM1MMKwRiAoMTgwwrBDKSBhbmQgYmFrZSBmb3IgMTAgbW9yZSBtaW51dGVzIG9yIHVudGlsIGdvbGRlbiBicm93bi4gKipEbyBub3Qgb3BlbiB0aGUgb3ZlbiBkb29yIGR1cmluZyBiYWtpbmcuKiogQWxsb3cgdG8gY29vbCBvbiBhIHdpcmUgcmFjay4NCg0KIyMjIyBNYWtpbmcgdGhlIEdvYXQgQ2hlZXNlIE1vdXNzZQ0KMS4gKipCbGVuZCBJbmdyZWRpZW50cyoqOiBJbiBhIGJvd2wsIHdoaXNrIHRvZ2V0aGVyIGdvYXQgY2hlZXNlLCBoZWF2eSBjcmVhbSwgYW5kIGhvbmV5IHVudGlsIHNtb290aC4NCg0KMi4gKipTZWFzb24qKjogQWRkIHNhbHQgYW5kIHBlcHBlciB0byB0YXN0ZSBhbmQgd2hpc2sgdW50aWwgdGhlIG1peHR1cmUgaG9sZHMgc29mdCBwZWFrcy4NCg0KMy4gKipUcmFuc2ZlcioqOiBTcG9vbiB0aGUgbW91c3NlIGludG8gYSBjbGVhbiBwaXBpbmcgYmFnIGZpdHRlZCB3aXRoIGEgc21hbGwgdGlwIGZvciBmaWxsaW5nLg0KDQojIyMjIEFzc2VtYmxpbmcgdGhlIMOJY2xhaXINCjEuICoqUHJlcGFyZSB0aGUgw4ljbGFpcnMqKjogU2xpY2UgZWFjaCDDqWNsYWlyIGluIGhhbGYgbGVuZ3Rod2lzZSwga2VlcGluZyB0aGUgdG9wIGFuZCBib3R0b20gY29ubmVjdGVkIHNsaWdodGx5IG9uIG9uZSBlbmQgbGlrZSBhIGhpbmdlLg0KDQoyLiAqKkZpbGwqKjogUGlwZSBnb2F0IGNoZWVzZSBtb3Vzc2UgaW50byBlYWNoIMOpY2xhaXIgYmFzZS4NCg0KMy4gKipBZGQgVG9tYXRvZXMgYW5kIEJhc2lsKio6IEV2ZW5seSBkaXN0cmlidXRlIHRoZSBzdW4tZHJpZWQgdG9tYXRvZXMgYW5kIGJhc2lsIG92ZXIgdGhlIG1vdXNzZS4NCg0KNC4gKipEcml6emxlIHdpdGggT2xpdmUgT2lsKio6IExpZ2h0bHkgZHJpenpsZSBvbGl2ZSBvaWwgb24gdG9wIGZvciBhZGRlZCBmbGF2b3IuDQoNCiMjIyMgU2VydmUNCi0gKipXaW5lIFBhaXJpbmcqKjogUGFpciB3aXRoIGEgY2hpbGxlZCBnbGFzcyBvZiBTYW5jZXJyZSBEb21haW5lIFZhY2hlcm9uIDIwMjAgdG8gY29tcGxlbWVudCBhbmQgZW5oYW5jZSB0aGUgZmxhdm9ycyBvZiB0aGUgZ29hdCBjaGVlc2UgYW5kIHRvbWF0b2VzLg0KDQpFbmpveSBjcmFmdGluZyB0aGlzIGRlbGlnaHRmdWwgYXBwZXRpemVyIHRoYXQgY29tYmluZXMgY3JlYW15LCB0YW5neSBmbGF2b3JzIHdpdGggYSBoaW50IG9mIGZyZXNobmVzcywgcGVyZmVjdCBmb3Igc3RhcnRpbmcgeW91ciBnYXN0cm9ub21pY2FsIGV4cGVyaWVuY2Uu";export{G as default};
