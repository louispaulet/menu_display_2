const G="data:text/markdown;base64,IyBHcmlsbGVkIFRpZ2VyIFByYXducyB3aXRoIE1hbmdvIGFuZCBBdm9jYWRvIFNhbGFkDQoNCiMjIERlc2NyaXB0aW9uOg0KQSBkZWxpZ2h0ZnVsIGFwcGV0aXplciBmZWF0dXJpbmcgc3VjY3VsZW50IGdyaWxsZWQgdGlnZXIgcHJhd25zIHNlcnZlZCBvbiBhIHJlZnJlc2hpbmcgYmVkIG9mIG1hbmdvIGFuZCBhdm9jYWRvIHNhbGFkLCBjb21wbGVtZW50ZWQgd2l0aCBhIHplc3R5IGNoaWxpLWxpbWUgZHJlc3NpbmcuIEJlc3QgcGFpcmVkIHdpdGggYSBnbGFzcyBvZiBNdWxkZXJib3NjaCBDaGVuaW4gQmxhbmMgMjAxOS4NCg0KLS0tDQoNCiMjIEluZ3JlZGllbnRzOg0KDQojIyMgRm9yIHRoZSBUaWdlciBQcmF3bnM6DQotICoqMTIgbGFyZ2UgdGlnZXIgcHJhd25zKiosIGRldmVpbmVkLCBzaGVsbHMgb24NCi0gKioyIHRhYmxlc3Bvb25zIG9saXZlIG9pbCoqDQotICoqMiBnYXJsaWMgY2xvdmVzKiosIG1pbmNlZA0KLSAqKjEgdGVhc3Bvb24gc21va2VkIHBhcHJpa2EqKg0KLSAqKlNhbHQgYW5kIHBlcHBlcioqLCB0byB0YXN0ZQ0KDQojIyMgRm9yIHRoZSBNYW5nbyBhbmQgQXZvY2FkbyBTYWxhZDoNCi0gKioxIHJpcGUgbWFuZ28qKiwgZGljZWQNCi0gKioxIHJpcGUgYXZvY2FkbyoqLCBkaWNlZA0KLSAqKjEgc21hbGwgcmVkIG9uaW9uKiosIGZpbmVseSBjaG9wcGVkDQotICoqMSByZWQgYmVsbCBwZXBwZXIqKiwgZmluZWx5IGRpY2VkDQotICoqMS80IGN1cCBmcmVzaCBjaWxhbnRybyoqLCBjaG9wcGVkDQoNCiMjIyBGb3IgdGhlIENoaWxpLUxpbWUgRHJlc3Npbmc6DQotICoqMiB0YWJsZXNwb29ucyBmcmVzaCBsaW1lIGp1aWNlKioNCi0gKioyIHRhYmxlc3Bvb25zIG9saXZlIG9pbCoqDQotICoqMSB0YWJsZXNwb29uIGhvbmV5KioNCi0gKioxIHNtYWxsIHJlZCBjaGlsaSoqLCBmaW5lbHkgY2hvcHBlZA0KLSAqKlNhbHQgYW5kIHBlcHBlcioqLCB0byB0YXN0ZQ0KDQotLS0NCg0KIyMgSW5zdHJ1Y3Rpb25zOg0KDQojIyMgUHJlcGFyaW5nIHRoZSBUaWdlciBQcmF3bnM6DQoxLiAqKk1hcmluYXRlIHRoZSBwcmF3bnMqKjogSW4gYSBib3dsLCBjb21iaW5lIHRoZSBvbGl2ZSBvaWwsIG1pbmNlZCBnYXJsaWMsIHNtb2tlZCBwYXByaWthLCBzYWx0LCBhbmQgcGVwcGVyLiBBZGQgdGhlIHRpZ2VyIHByYXducyBhbmQgdG9zcyB0byBjb2F0IGV2ZW5seS4gTGV0IHRoZW0gbWFyaW5hdGUgaW4gdGhlIHJlZnJpZ2VyYXRvciBmb3IgYXQgbGVhc3QgMzAgbWludXRlcy4NCg0KMi4gKipHcmlsbCB0aGUgcHJhd25zKio6IFByZWhlYXQgeW91ciBncmlsbCB0byBtZWRpdW0taGlnaCBoZWF0LiBQbGFjZSB0aGUgcHJhd25zIG9uIHRoZSBncmlsbCBhbmQgY29vayBmb3IgYWJvdXQgMi0zIG1pbnV0ZXMgb24gZWFjaCBzaWRlIG9yIHVudGlsIHRoZXkgYXJlIG9wYXF1ZSBhbmQgc2xpZ2h0bHkgY2hhcnJlZC4NCg0KIyMjIFByZXBhcmluZyB0aGUgTWFuZ28gYW5kIEF2b2NhZG8gU2FsYWQ6DQoxLiBJbiBhIGxhcmdlIGJvd2wsIGNvbWJpbmUgdGhlIGRpY2VkIG1hbmdvLCBhdm9jYWRvLCByZWQgb25pb24sIHJlZCBiZWxsIHBlcHBlciwgYW5kIGNpbGFudHJvLg0KDQoyLiAqKk1ha2UgdGhlIGRyZXNzaW5nKio6IEluIGEgc2VwYXJhdGUgYm93bCwgd2hpc2sgdG9nZXRoZXIgdGhlIGxpbWUganVpY2UsIG9saXZlIG9pbCwgaG9uZXksIGNob3BwZWQgY2hpbGksIHNhbHQsIGFuZCBwZXBwZXIuDQoNCjMuICoqRHJlc3MgdGhlIHNhbGFkKio6IFBvdXIgdGhlIGNoaWxpLWxpbWUgZHJlc3Npbmcgb3ZlciB0aGUgbWFuZ28gYW5kIGF2b2NhZG8gbWl4dHVyZS4gVG9zcyBnZW50bHkgdG8gY29tYmluZSwgZW5zdXJpbmcgdGhlIHNhbGFkIGlzIHdlbGwtY29hdGVkLg0KDQojIyMgUGxhdGluZzoNCjEuIEFycmFuZ2UgYSBwb3J0aW9uIG9mIHRoZSBtYW5nbyBhbmQgYXZvY2FkbyBzYWxhZCBpbiB0aGUgY2VudGVyIG9mIGVhY2ggc2VydmluZyBwbGF0ZS4NCg0KMi4gTGF5ZXIgdGhlIGdyaWxsZWQgdGlnZXIgcHJhd25zIG9uIHRvcCBvZiB0aGUgc2FsYWQuDQoNCjMuIEdhcm5pc2ggd2l0aCBhZGRpdGlvbmFsIGZyZXNoIGNpbGFudHJvIGxlYXZlcyBhbmQgYSBsaW1lIHdlZGdlLg0KDQo0LiBTZXJ2ZSBpbW1lZGlhdGVseSwgcGFpcmVkIHdpdGggYSBjaGlsbGVkIGdsYXNzIG9mIE11bGRlcmJvc2NoIENoZW5pbiBCbGFuYyAyMDE5Lg0KDQotLS0NCg0KIyMgVGlwczoNCi0gRW5zdXJlIHRoZSBwcmF3bnMgYXJlIGVxdWFsbHkgc2l6ZWQgZm9yIGNvbnNpc3RlbnQgY29va2luZy4NCi0gVXRpbGl6ZSBhbiBvdXRkb29yIGdyaWxsIGZvciBvcHRpbWFsIHNtb2t5IGZsYXZvciBvciBhbiBpbmRvb3IgZ3JpbGwgcGFuIGlmIG91dGRvb3JzIGlzIG5vdCBwb3NzaWJsZS4NCi0gQWRqdXN0IHRoZSBjaGlsaSBlbGVtZW50IGluIHRoZSBkcmVzc2luZyB0byBjYXRlciB0byBwZXJzb25hbCBzcGljZSBwcmVmZXJlbmNlcy4NCg0KRW5qb3kgdGhpcyB2aWJyYW50IGFuZCBmbGF2b3JmdWwgZGlzaCBhcyBhbiBhcHBldGl6ZXIgb3IgYXMgcGFydCBvZiBhIGxpZ2h0IG1lYWwuIFRoZSBiYWxhbmNlIGJldHdlZW4gdGhlIHN3ZWV0IG1hbmdvLCBjcmVhbXkgYXZvY2FkbywgYW5kIHNwaWN5IGRyZXNzaW5nIG1ha2VzIGl0IGFuIGFic29sdXRlIGZhdm9yaXRlIGFtb25nIHNlYWZvb2QgbG92ZXJzLg==";export{G as default};
