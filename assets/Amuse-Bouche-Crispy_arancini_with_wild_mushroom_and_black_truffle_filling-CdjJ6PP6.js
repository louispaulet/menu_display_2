const G="data:text/markdown;base64,IyBDcmlzcHkgQXJhbmNpbmkgd2l0aCBXaWxkIE11c2hyb29tIGFuZCBCbGFjayBUcnVmZmxlIEZpbGxpbmcNCg0KKipDb3Vyc2U6KiogQW11c2UtQm91Y2hlICANCioqV2luZSBQYWlyaW5nOioqIEZyYW5jaWFjb3J0YSBDYScgZGVsIEJvc2NvIEN1dsOpZSBBbm5hbWFyaWEgQ2xlbWVudGkgMjAxMA0KDQojIyBJbmdyZWRpZW50cw0KDQojIyMgRm9yIHRoZSBSaXNvdHRvOg0KLSAxIGN1cCBBcmJvcmlvIHJpY2UNCi0gMiB0YWJsZXNwb29ucyBvbGl2ZSBvaWwNCi0gMSBzaGFsbG90LCBmaW5lbHkgY2hvcHBlZA0KLSAxLzIgY3VwIGRyeSB3aGl0ZSB3aW5lDQotIDMgY3VwcyBjaGlja2VuIG9yIHZlZ2V0YWJsZSBzdG9jaywga2VwdCB3YXJtDQotIDMgdGFibGVzcG9vbnMgdW5zYWx0ZWQgYnV0dGVyDQotIDEvNCBjdXAgUGFybWlnaWFuby1SZWdnaWFubywgZ3JhdGVkDQotIFNhbHQgYW5kIGZyZXNobHkgZ3JvdW5kIGJsYWNrIHBlcHBlciwgdG8gdGFzdGUNCg0KIyMjIEZvciB0aGUgRmlsbGluZzoNCi0gMiB0YWJsZXNwb29ucyBvbGl2ZSBvaWwNCi0gMSBjdXAgd2lsZCBtdXNocm9vbXMsIGNsZWFuZWQgYW5kIGZpbmVseSBjaG9wcGVkDQotIDEgY2xvdmUgZ2FybGljLCBtaW5jZWQNCi0gMSB0YWJsZXNwb29uIGZyZXNoIHRoeW1lIGxlYXZlcw0KLSAxIHRhYmxlc3Bvb24gYmxhY2sgdHJ1ZmZsZSBvaWwNCi0gU2FsdCBhbmQgZnJlc2hseSBncm91bmQgYmxhY2sgcGVwcGVyLCB0byB0YXN0ZQ0KDQojIyMgRm9yIEJyZWFkaW5nIGFuZCBGcnlpbmc6DQotIDEvMiBjdXAgYWxsLXB1cnBvc2UgZmxvdXINCi0gMiBsYXJnZSBlZ2dzLCBiZWF0ZW4NCi0gMSBjdXAgcGFua28gYnJlYWRjcnVtYnMNCi0gVmVnZXRhYmxlIG9pbCwgZm9yIGZyeWluZw0KDQojIyBJbnN0cnVjdGlvbnMNCg0KIyMjIE1ha2UgdGhlIFJpc290dG86DQoxLiBIZWF0IG9saXZlIG9pbCBpbiBhIGxhcmdlIHNhdWNlcGFuIG92ZXIgbWVkaXVtIGhlYXQuIEFkZCBzaGFsbG90IGFuZCBjb29rIHVudGlsIHRyYW5zbHVjZW50LCBhYm91dCAzIG1pbnV0ZXMuDQoyLiBBZGQgQXJib3JpbyByaWNlIHRvIHRoZSBwYW4sIHN0aXJyaW5nIHRvIGNvYXQgd2l0aCBvaWwsIGFuZCBsaWdodGx5IHRvYXN0IGZvciAx4oCTMiBtaW51dGVzLg0KMy4gUG91ciBpbiB0aGUgd2hpdGUgd2luZSwgc3RpcnJpbmcgdW50aWwgYWJzb3JiZWQgYnkgdGhlIHJpY2UuDQo0LiBBZGQgd2FybSBzdG9jaywgMS8yIGN1cCBhdCBhIHRpbWUsIHN0aXJyaW5nIGNvbnN0YW50bHkgYW5kIGFsbG93aW5nIGxpcXVpZCB0byBiZSBhYnNvcmJlZCBiZWZvcmUgYWRkaW5nIG1vcmUuDQo1LiBPbmNlIHRoZSByaWNlIGlzIGNyZWFteSBhbmQgdGVuZGVyLCByZW1vdmUgZnJvbSBoZWF0IGFuZCBzdGlyIGluIGJ1dHRlciBhbmQgZ3JhdGVkIFBhcm1pZ2lhbm8tUmVnZ2lhbm8uDQo2LiBTZWFzb24gcmlzb3R0byB3aXRoIHNhbHQgYW5kIHBlcHBlciwgYW5kIHNwcmVhZCBvbnRvIGEgYmFraW5nIHNoZWV0IHRvIGNvb2wgY29tcGxldGVseS4NCg0KIyMjIFByZXBhcmUgdGhlIEZpbGxpbmc6DQoxLiBJbiBhIHNraWxsZXQsIGhlYXQgb2xpdmUgb2lsIG92ZXIgbWVkaXVtLWhpZ2ggaGVhdC4gQWRkIG11c2hyb29tcyBhbmQgY29vayB1bnRpbCB0aGV5IGFyZSBnb2xkZW4gYnJvd24gYW5kIGhhdmUgcmVsZWFzZWQgbW9zdCBvZiB0aGVpciBtb2lzdHVyZS4NCjIuIEFkZCBtaW5jZWQgZ2FybGljIGFuZCB0aHltZSwgY29va2luZyB1bnRpbCBmcmFncmFudCwgYWJvdXQgMSBtaW51dGUuDQozLiBBZGQgdHJ1ZmZsZSBvaWwsIHN0aXIgdG8gY29tYmluZSwgYW5kIHNlYXNvbiB3aXRoIHNhbHQgYW5kIHBlcHBlci4NCjQuIFJlbW92ZSBmcm9tIGhlYXQgYW5kIGxldCB0aGUgbWl4dHVyZSBjb29sIHNsaWdodGx5Lg0KDQojIyMgQXNzZW1ibGUgdGhlIEFyYW5jaW5pOg0KMS4gT25jZSByaXNvdHRvIGlzIGNvb2xlZCwgdGFrZSBhIHRhYmxlc3Bvb24gb2YgcmljZSBpbiB0aGUgcGFsbSBvZiB5b3VyIGhhbmQsIGZsYXR0ZW4gaXQgc2xpZ2h0bHksIGFuZCBwbGFjZSBhIHNtYWxsIHNwb29uZnVsIG9mIG11c2hyb29tIGZpbGxpbmcgaW4gdGhlIGNlbnRlci4NCjIuIEVuY2FzZSB0aGUgZmlsbGluZyB3aXRoIGFub3RoZXIgdGFibGVzcG9vbiBvZiByaXNvdHRvIGFuZCByb2xsIGludG8gYSBiYWxsLCBlbnN1cmluZyB0aGUgZmlsbGluZyBpcyBjb21wbGV0ZWx5IGVuY2xvc2VkLg0KMy4gUmVwZWF0IHVudGlsIGFsbCB0aGUgcmlzb3R0byBhbmQgZmlsbGluZyBhcmUgdXNlZC4NCg0KIyMjIEJyZWFkIGFuZCBGcnk6DQoxLiBTZXQgdXAgYSBicmVhZGluZyBzdGF0aW9uIHdpdGggZmxvdXIsIGJlYXRlbiBlZ2dzLCBhbmQgcGFua28gaW4gc2VwYXJhdGUgc2hhbGxvdyBib3dscy4NCjIuIFJvbGwgZWFjaCByaXNvdHRvIGJhbGwgZmlyc3QgaW4gZmxvdXIsIHRoZW4gaW4gZWdnLCBhbmQgZmluYWxseSBpbiBwYW5rby4NCjMuIEhlYXQgdmVnZXRhYmxlIG9pbCBpbiBhIGRlZXAgc2F1Y2VwYW4gdG8gMzUwwrBGICgxNzXCsEMpLg0KNC4gRnJ5IGFyYW5jaW5pIGluIGJhdGNoZXMgdW50aWwgZ29sZGVuIGJyb3duIGFuZCBjcmlzcHksIGFib3V0IDPigJM0IG1pbnV0ZXMgcGVyIGJhdGNoLg0KNS4gUmVtb3ZlIHdpdGggYSBzbG90dGVkIHNwb29uIGFuZCBkcmFpbiBvbiBwYXBlciB0b3dlbHMuDQoNCiMjIyBTZXJ2ZToNCi0gUGxhdGUgdGhlIGNyaXNweSBhcmFuY2luaSwgYW5kIHNlcnZlIGltbWVkaWF0ZWx5IGFsb25nc2lkZSBhIGdsYXNzIG9mIEZyYW5jaWFjb3J0YSwgZm9yIGEgbHV4dXJpb3VzIGFuZCBpbmR1bGdlbnQgYW11c2UtYm91Y2hlLg==";export{G as default};
