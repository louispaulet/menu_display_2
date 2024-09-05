const G="data:text/markdown;base64,IyMgVGFydGUgVGF0aW4NCg0KIyMjIEluZ3JlZGllbnRzDQoNCiMjIyMgQ2FyYW1lbGl6ZWQgQXBwbGVzDQotIDYgbGFyZ2UgR3Jhbm55IFNtaXRoIGFwcGxlcw0KLSAxIGN1cCBncmFudWxhdGVkIHN1Z2FyDQotIDEvNCBjdXAgdW5zYWx0ZWQgYnV0dGVyDQotIDEgdGFibGVzcG9vbiBsZW1vbiBqdWljZQ0KDQojIyMjIFB1ZmYgUGFzdHJ5DQotIDEgc2hlZXQgb2YgcHVmZiBwYXN0cnksIHRoYXdlZCAoaWYgdXNpbmcgc3RvcmUtYm91Z2h0KQ0KDQojIyMjIFZhbmlsbGEgQ3LDqG1lIEZyYcOuY2hlDQotIDEgY3VwIGNyw6htZSBmcmHDrmNoZQ0KLSAxIHRlYXNwb29uIHZhbmlsbGEgZXh0cmFjdA0KLSAxIHRhYmxlc3Bvb24gcG93ZGVyZWQgc3VnYXINCg0KIyMjIEVxdWlwbWVudA0KLSA5LWluY2ggb3ZlbnByb29mIHNraWxsZXQgb3IgdGFydGUgdGF0aW4gZGlzaA0KLSBSb2xsaW5nIHBpbg0KLSBQYXN0cnkgYm9hcmQNCi0gTWFuZG9saW5lIHNsaWNlciAob3B0aW9uYWwpDQoNCiMjIyBJbnN0cnVjdGlvbnMNCg0KIyMjIyBDYXJhbWVsaXppbmcgdGhlIEFwcGxlcw0KMS4gKipQcmVoZWF0IHRoZSBPdmVuKio6IFByZWhlYXQgeW91ciBvdmVuIHRvIDM3NcKwRiAoMTkwwrBDKS4NCg0KMi4gKipQcmVwYXJlIHRoZSBBcHBsZXMqKjogUGVlbCwgY29yZSwgYW5kIGN1dCB0aGUgYXBwbGVzIGludG8gcXVhcnRlcnMuIE9wdGlvbmFsbHksIHVzZSBhIG1hbmRvbGluZSBzbGljZXIgZm9yIGV2ZW4gcXVhcnRlcmluZy4NCg0KMy4gKipNYWtlIHRoZSBDYXJhbWVsKio6IEluIHRoZSBvdmVucHJvb2Ygc2tpbGxldCBvdmVyIG1lZGl1bSBoZWF0LCBtZWx0IHRoZSBidXR0ZXIuIEFkZCB0aGUgc3VnYXIsIHN0aXJyaW5nIGdlbnRseSB1bnRpbCBpdCBkaXNzb2x2ZXMgaW50byBhIGdvbGRlbiBjYXJhbWVsLiBCZSBjYXV0aW91cyBub3QgdG8gYnVybiB0aGUgc3VnYXIuDQoNCjQuICoqQWRkIEFwcGxlcyB0byBDYXJhbWVsKio6IEFycmFuZ2UgdGhlIGFwcGxlIHF1YXJ0ZXJzIGluIHRoZSBza2lsbGV0LCBwbGFjaW5nIHRoZW0gdXByaWdodCwgc251Z2x5IHBhY2tlZCB0b2dldGhlciwgYW5kIGNvbnRpbnVlIHRvIGNvb2sgZm9yIGFib3V0IDEwIG1pbnV0ZXMuIFR1cm4gdGhlIGFwcGxlcyBvY2Nhc2lvbmFsbHkgdG8gZW5zdXJlIHRoZXkgYXJlIGV2ZW5seSBjb2F0ZWQgaW4gY2FyYW1lbC4NCg0KNS4gKipBZGQgTGVtb24gSnVpY2UqKjogT25jZSB0aGUgYXBwbGVzIGFyZSB3ZWxsLWNvYXRlZCBhbmQgY2FyYW1lbGl6ZWQgYW5kIHRoZSBjYXJhbWVsIGlzIGEgZGVlcCBhbWJlciBjb2xvciwgc3ByaW5rbGUgdGhlIGxlbW9uIGp1aWNlIG92ZXIgdGhlIGFwcGxlcy4NCg0KIyMjIyBBc3NlbWJsZSB0aGUgVGFydGUNCjYuICoqUm9sbCBPdXQgdGhlIFBhc3RyeSoqOiBPbiBhIGxpZ2h0bHkgZmxvdXJlZCBwYXN0cnkgYm9hcmQsIHJvbGwgb3V0IHRoZSBwdWZmIHBhc3RyeSB0byBhIHNpemUgc2xpZ2h0bHkgbGFyZ2VyIHRoYW4gdGhlIHNraWxsZXQuDQoNCjcuICoqVG9wIHRoZSBBcHBsZXMqKjogTGF5IHRoZSBwYXN0cnkgb3ZlciB0aGUgYXBwbGVzLCB0dWNraW5nIGluIHRoZSBlZGdlcyBhcm91bmQgdGhlIGFwcGxlcyBjYXJlZnVsbHkuDQoNCjguICoqQmFrZSB0aGUgVGFydGUgVGF0aW4qKjogVHJhbnNmZXIgdGhlIHNraWxsZXQgdG8gdGhlIG92ZW4gYW5kIGJha2UgZm9yIDI1LTMwIG1pbnV0ZXMgb3IgdW50aWwgdGhlIHBhc3RyeSBpcyBwdWZmZWQgYW5kIGdvbGRlbiBicm93bi4NCg0KIyMjIyBNYWtlIHRoZSBWYW5pbGxhIENyw6htZSBGcmHDrmNoZQ0KOS4gKipQcmVwYXJlIHRoZSBDcsOobWUqKjogV2hpbGUgdGhlIHRhcnRlIGlzIGJha2luZywgY29tYmluZSBjcsOobWUgZnJhw65jaGUsIHZhbmlsbGEgZXh0cmFjdCwgYW5kIHBvd2RlcmVkIHN1Z2FyIGluIGEgYm93bC4gU3RpciB1bnRpbCBzbW9vdGggYW5kIHJlZnJpZ2VyYXRlIHVudGlsIHJlYWR5IHRvIHVzZS4NCg0KIyMjIyBTZXJ2ZQ0KMTAuICoqSW52ZXJ0IGFuZCBTZXJ2ZSoqOiBSZW1vdmUgdGhlIHNraWxsZXQgZnJvbSB0aGUgb3ZlbiwgYW5kIGFsbG93IGl0IHRvIGNvb2wgc2xpZ2h0bHkgKGFib3V0IDUgbWludXRlcykgYmVmb3JlIGNhcmVmdWxseSBpbnZlcnRpbmcgaXQgb250byBhIHNlcnZpbmcgcGxhdGUuIEJlIGNhdXRpb3VzLCBhcyB0aGUgY2FyYW1lbCBpcyBleHRyZW1lbHkgaG90Lg0KDQoxMS4gKipHYXJuaXNoKio6IFNlcnZlIHRoZSB0YXJ0ZSB0YXRpbiB3YXJtLCBhY2NvbXBhbmllZCBieSBhIGRvbGxvcCBvZiB2YW5pbGxhIGNyw6htZSBmcmHDrmNoZSBvbiB0aGUgc2lkZS4NCg0KIyMjIFdpbmUgUGFpcmluZw0KRm9yIGFuIGV4Y2VsbGVudCBkaW5pbmcgZXhwZXJpZW5jZSwgcGFpciB0aGlzIHRhcnRlIHRhdGluIHdpdGggYSBnbGFzcyBvZiAqKkNow6J0ZWF1IFN1ZHVpcmF1dCBTYXV0ZXJuZXMgMjAxNioqLiBUaGUgZGVzc2VydCB3aW5lJ3MgcmljaCBzd2VldG5lc3MgYW5kIGFjaWRpdHkgY29tcGxlbWVudCB0aGUgY2FyYW1lbGl6ZWQgYXBwbGVzIHBlcmZlY3RseS4=";export{G as default};
