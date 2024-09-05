const g="data:text/markdown;base64,IyBTZWxlY3Rpb24gb2YgRmluZSBJdGFsaWFuIENoZWVzZXMgd2l0aCBGcnVpdCBDb21wb3RlLCBBcnRpc2FuYWwgQnJlYWQsIGFuZCBCYWxzYW1pYyBQZWFybHMNCg0KIyMgSW5ncmVkaWVudHMNCg0KIyMjIENoZWVzZSBTZWxlY3Rpb246DQotICoqUGVjb3Jpbm8gVG9zY2FubyoqDQotICoqR29yZ29uem9sYSBEb2xjZSoqDQotICoqUGFybWlnaWFuby1SZWdnaWFubyoqDQotICoqVGFsZWdnaW8qKg0KLSAqKkFzaWFnbyoqDQoNCiMjIyBGcnVpdCBDb21wb3RlOg0KLSAqKjIgY3VwcyBtaXhlZCBkcmllZCBmcnVpdHMqKiAoYXByaWNvdHMsIGZpZ3MsIGNoZXJyaWVzKQ0KLSAqKjEgY3VwIHdhdGVyKioNCi0gKioxLzQgY3VwIGhvbmV5KioNCi0gKioxIHRhYmxlc3Bvb24gbGVtb24ganVpY2UqKg0KLSAqKjEgY2lubmFtb24gc3RpY2sqKg0KDQojIyMgQXJ0aXNhbmFsIEJyZWFkOg0KLSAqKjEgYXJ0aXNhbmFsIGJhZ3VldHRlKioNCi0gKipPbGl2ZSBvaWwqKiwgZm9yIGJydXNoaW5nDQoNCiMjIyBCYWxzYW1pYyBQZWFybHM6DQotICoqMTAwIG1sIGJhbHNhbWljIHZpbmVnYXIqKg0KLSAqKjEgdGVhc3Bvb24gYWdhci1hZ2FyIHBvd2RlcioqDQotICoqMSBjdXAgY29sZCB2ZWdldGFibGUgb3Igb2xpdmUgb2lsKioNCg0KIyMgSW5zdHJ1Y3Rpb25zDQoNCiMjIyBDaGVlc2UgUHJlcGFyYXRpb246DQoxLiBBbGxvdyBhbGwgY2hlZXNlcyB0byBjb21lIHRvIHJvb20gdGVtcGVyYXR1cmUgYnkgcmVtb3ZpbmcgZnJvbSB0aGUgcmVmcmlnZXJhdG9yIGF0IGxlYXN0IDEgaG91ciBiZWZvcmUgc2VydmluZy4NCjIuIEFycmFuZ2UgY2hlZXNlcyBvbiBhIGxhcmdlIHBsYXR0ZXIsIGFsbG93aW5nIGVhY2ggdHlwZSBpdHMgb3duIHNwYWNlIGZvciBwcmVzZW50YXRpb24uDQoNCiMjIyBGcnVpdCBDb21wb3RlOg0KMS4gQ2hvcCBkcmllZCBmcnVpdHMgaW50byBzbWFsbCBwaWVjZXMuDQoyLiBJbiBhIG1lZGl1bSBzYXVjZXBhbiwgY29tYmluZSB0aGUgZHJpZWQgZnJ1aXRzLCB3YXRlciwgaG9uZXksIGxlbW9uIGp1aWNlLCBhbmQgY2lubmFtb24gc3RpY2suDQozLiBCcmluZyB0byBhIGJvaWwgb3ZlciBtZWRpdW0gaGVhdCwgdGhlbiByZWR1Y2UgdGhlIGhlYXQgYW5kIHNpbW1lciB1bnRpbCB0aGUgZnJ1aXRzIHNvZnRlbiBhbmQgdGhlIGxpcXVpZCB0aGlja2VucyBpbnRvIGEgc3lydXB5IGNvbnNpc3RlbmN5LCBhYm91dCAxNS0yMCBtaW51dGVzLg0KNC4gUmVtb3ZlIHRoZSBjaW5uYW1vbiBzdGljayBhbmQgbGV0IHRoZSBjb21wb3RlIGNvb2wgdG8gcm9vbSB0ZW1wZXJhdHVyZSBiZWZvcmUgc2VydmluZy4NCg0KIyMjIEFydGlzYW5hbCBCcmVhZDoNCjEuIFByZWhlYXQgeW91ciBvdmVuIHRvIDM3NcKwRiAoMTkwwrBDKS4NCjIuIFNsaWNlIHRoZSBiYWd1ZXR0ZSBpbnRvIHRoaW4gc2xpY2VzLg0KMy4gQnJ1c2ggZWFjaCBzbGljZSBsaWdodGx5IHdpdGggb2xpdmUgb2lsIGFuZCBwbGFjZSBvbiBhIGJha2luZyBzaGVldC4NCjQuIEJha2UgaW4gdGhlIG92ZW4gZm9yIGFib3V0IDgtMTAgbWludXRlcyBvciB1bnRpbCBnb2xkZW4gYW5kIGNyaXNwLg0KDQojIyMgQmFsc2FtaWMgUGVhcmxzOg0KMS4gUG91ciB0aGUgdmVnZXRhYmxlIG9yIG9saXZlIG9pbCBpbnRvIGEgZ2xhc3MgYW5kIHBsYWNlIGl0IGluIHRoZSBmcmVlemVyIGZvciAzMCBtaW51dGVzLg0KMi4gSW4gYSBzbWFsbCBzYXVjZXBhbiwgY29tYmluZSB0aGUgYmFsc2FtaWMgdmluZWdhciBhbmQgYWdhci1hZ2FyIHBvd2Rlci4gU3RpciB1bnRpbCB0aGUgYWdhci1hZ2FyIGRpc3NvbHZlcy4NCjMuIEJyaW5nIHRvIGEgYm9pbCBhbmQgbGV0IGl0IGNvb2wgZm9yIGEgZmV3IG1pbnV0ZXMuDQo0LiBVc2luZyBhIGRyb3BwZXIsIGdlbnRseSBkcm9wIHRoZSBiYWxzYW1pYyBtaXh0dXJlIGludG8gdGhlIGNvbGQgb2lsLiBUaGUgZHJvcHMgd2lsbCBzb2xpZGlmeSB1cG9uIGNvbnRhY3QgdG8gZm9ybSBwZWFybHMuDQo1LiBVc2luZyBhIGZpbmUtbWVzaCBzdHJhaW5lciwgZHJhaW4gdGhlIHBlYXJscyBmcm9tIHRoZSBvaWwgYW5kIHJpbnNlIHdpdGggY29sZCB3YXRlci4NCg0KIyMjIEFzc2VtYmxpbmcgdGhlIERpc2g6DQoxLiBQbGFjZSBhIHNtYWxsIGJvd2wgb2YgZnJ1aXQgY29tcG90ZSBpbiB0aGUgY2VudGVyIG9mIGEgc2VydmluZyBwbGF0dGVyLg0KMi4gQXJyYW5nZSB0aGUgc2xpY2VkIGJyZWFkIGFyb3VuZCB0aGUgY2hlZXNlcyBhbmQgcGxhY2UgYSBib3dsIG9mIGJhbHNhbWljIHBlYXJscyBhbG9uZ3NpZGUuDQozLiBTZXJ2ZSB3aXRoIGEgYm90dGxlIG9mIFRpZ25hbmVsbG8gQW50aW5vcmkgMjAxNyB0byBwZXJmZWN0bHkgY29tcGxlbWVudCB0aGUgZmxhdm9ycy4NCg0KIyMjIFdpbmUgUGFpcmluZzoNCi0gKipUaWduYW5lbGxvIEFudGlub3JpIDIwMTcqKiwgYSB3ZWxsLXN0cnVjdHVyZWQgcmVkIHdpbmUsIGVuaGFuY2VzIHRoZSBudXR0eSBhbmQgY3JlYW15IHRleHR1cmVzIG9mIHRoZSBjaGVlc2VzIGFuZCBwYWlycyBiZWF1dGlmdWxseSB3aXRoIHRoZSBzd2VldCBhbmQgdGFuZ3kgY29tcG90ZSBmb3IgYW4gZWxldmF0ZWQgZGluaW5nIGV4cGVyaWVuY2UuIEVuam95ISA=";export{g as default};
