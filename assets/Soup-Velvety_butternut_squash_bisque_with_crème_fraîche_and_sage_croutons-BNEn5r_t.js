const I="data:text/markdown;base64,IyBWZWx2ZXR5IEJ1dHRlcm51dCBTcXVhc2ggQmlzcXVlIHdpdGggQ3LDqG1lIEZyYcOuY2hlIGFuZCBTYWdlIENyb3V0b25zDQoNCiMjIyBJbmdyZWRpZW50cw0KDQojIyMjIEZvciB0aGUgQmlzcXVlOg0KLSAyIHRhYmxlc3Bvb25zIG9saXZlIG9pbA0KLSAxIGxhcmdlIG9uaW9uLCBjaG9wcGVkDQotIDMgY2xvdmVzIGdhcmxpYywgbWluY2VkDQotIDEgbGFyZ2UgYnV0dGVybnV0IHNxdWFzaCAoYWJvdXQgMyBwb3VuZHMpLCBwZWVsZWQsIHNlZWRlZCwgYW5kIGN1YmVkDQotIDQgY3VwcyB2ZWdldGFibGUgYnJvdGgNCi0gMSBjdXAgYXBwbGUgY2lkZXINCi0gMSB0ZWFzcG9vbiBncm91bmQgbnV0bWVnDQotIDEgdGVhc3Bvb24gc2FsdA0KLSAxLzIgdGVhc3Bvb24gZnJlc2hseSBncm91bmQgYmxhY2sgcGVwcGVyDQotIDEvMiBjdXAgaGVhdnkgY3JlYW0NCi0gMS80IGN1cCBjcsOobWUgZnJhw65jaGUsIHBsdXMgbW9yZSBmb3IgZ2FybmlzaA0KDQojIyMjIEZvciB0aGUgU2FnZSBDcm91dG9uczoNCi0gMiBjdXBzIHN0YWxlIGJyZWFkLCBjdXQgaW50byAxLWluY2ggY3ViZXMNCi0gMiB0YWJsZXNwb29ucyBvbGl2ZSBvaWwNCi0gMSB0YWJsZXNwb29uIGZyZXNoIHNhZ2UgbGVhdmVzLCBmaW5lbHkgY2hvcHBlZA0KLSBTYWx0IGFuZCBwZXBwZXIgdG8gdGFzdGUNCg0KIyMjIEluc3RydWN0aW9ucw0KDQojIyMjIFByZXBhcmUgdGhlIFNhZ2UgQ3JvdXRvbnM6DQoxLiBQcmVoZWF0IHlvdXIgb3ZlbiB0byAzNTDCsEYgKDE3NcKwQykuDQoyLiBJbiBhIG1peGluZyBib3dsLCBjb21iaW5lIHRoZSBicmVhZCBjdWJlcywgb2xpdmUgb2lsLCBjaG9wcGVkIHNhZ2UsIHNhbHQsIGFuZCBwZXBwZXIuIFRvc3MgdW50aWwgdGhlIGJyZWFkIGlzIGV2ZW5seSBjb2F0ZWQuDQozLiBTcHJlYWQgdGhlIGJyZWFkIGN1YmVzIGluIGEgc2luZ2xlIGxheWVyIG9uIGEgYmFraW5nIHNoZWV0Lg0KNC4gQmFrZSBmb3IgMTAtMTIgbWludXRlcywgb3IgdW50aWwgdGhlIGNyb3V0b25zIGFyZSBnb2xkZW4gYnJvd24gYW5kIGNyaXNwLiBSZW1vdmUgYW5kIGxldCBjb29sLg0KDQojIyMjIFByZXBhcmUgdGhlIEJpc3F1ZToNCjEuIEhlYXQgdGhlIG9saXZlIG9pbCBpbiBhIGxhcmdlIHBvdCBvdmVyIG1lZGl1bSBoZWF0Lg0KMi4gQWRkIHRoZSBjaG9wcGVkIG9uaW9uIGFuZCBnYXJsaWMgdG8gdGhlIHBvdC4gU2F1dMOpIHVudGlsIHRoZSBvbmlvbiBiZWNvbWVzIHRyYW5zbHVjZW50LCBhYm91dCA1IG1pbnV0ZXMuDQozLiBBZGQgdGhlIGN1YmVkIGJ1dHRlcm51dCBzcXVhc2ggdG8gdGhlIHBvdCBhbmQgc3RpciB0byBjb21iaW5lIHdpdGggdGhlIG9uaW9ucyBhbmQgZ2FybGljLg0KNC4gUG91ciBpbiB0aGUgdmVnZXRhYmxlIGJyb3RoIGFuZCBhcHBsZSBjaWRlciwgYW5kIGJyaW5nIHRoZSBtaXh0dXJlIHRvIGEgYm9pbC4NCjUuIFJlZHVjZSB0aGUgaGVhdCB0byBhIHNpbW1lciwgY292ZXIgdGhlIHBvdCwgYW5kIGNvb2sgZm9yIDIwLTI1IG1pbnV0ZXMsIG9yIHVudGlsIHRoZSBzcXVhc2ggaXMgdGVuZGVyLg0KNi4gUmVtb3ZlIHRoZSBwb3QgZnJvbSB0aGUgaGVhdC4gVXNlIGFuIGltbWVyc2lvbiBibGVuZGVyIHRvIHB1csOpZSB0aGUgc291cCB1bnRpbCBzbW9vdGguIEFsdGVybmF0aXZlbHksIGNhcmVmdWxseSB0cmFuc2ZlciB0aGUgc291cCB0byBhIGJsZW5kZXIsIGJsZW5kIHVudGlsIHNtb290aCwgYW5kIHJldHVybiB0byB0aGUgcG90Lg0KNy4gU3RpciBpbiB0aGUgbnV0bWVnLCBzYWx0LCBwZXBwZXIsIGhlYXZ5IGNyZWFtLCBhbmQgY3LDqG1lIGZyYcOuY2hlLiBIZWF0IHRoZSBzb3VwIG92ZXIgbG93IGhlYXQgdW50aWwgd2FybWVkIHRocm91Z2gsIGFib3V0IDUgbWludXRlcy4NCjguIEFkanVzdCBzZWFzb25pbmcgd2l0aCBhZGRpdGlvbmFsIHNhbHQgYW5kIHBlcHBlciwgaWYgbmVjZXNzYXJ5Lg0KDQojIyMgVG8gU2VydmU6DQoxLiBMYWRsZSB0aGUgaG90IGJpc3F1ZSBpbnRvIGJvd2xzLg0KMi4gVG9wIGVhY2ggYm93bCB3aXRoIGEgc3dpcmwgb2YgY3LDqG1lIGZyYcOuY2hlLg0KMy4gR2FybmlzaCB3aXRoIHNhZ2UgY3JvdXRvbnMuDQoNCiMjIyBXaW5lIFBhaXJpbmc6DQpTZXJ2ZSB3aXRoIGEgZ2xhc3Mgb2YgKipDaGFyZG9ubmF5IE9saXZpZXIgTGVmbGFpdmUgQm91cmdvZ25lIDIwMTkqKiBmb3IgYSBjb21wbGVtZW50YXJ5IGRpbmluZyBleHBlcmllbmNlLg==";export{I as default};
