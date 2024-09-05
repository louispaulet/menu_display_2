const I="data:text/markdown;base64,IyMjIENyaXNweSBWaWV0bmFtZXNlIENyZXBlIC0gQsOhbmggWMOobw0KKipTZXJ2aW5nczoqKiA0DQoNCiMjIyMgSW5ncmVkaWVudHM6DQogDQojIyMjIyBGb3IgdGhlIENyZXBlOg0KLSAxIGN1cCByaWNlIGZsb3VyDQotIDEvNCB0c3AgdHVybWVyaWMgcG93ZGVyDQotIDEgY3VwIGNvY29udXQgbWlsaw0KLSAxLzIgY3VwIHdhdGVyDQotIDEvNCB0c3Agc2FsdA0KLSAxLzQgY3VwIHNjYWxsaW9ucywgdGhpbmx5IHNsaWNlZA0KLSAyIHRic3AgdmVnZXRhYmxlIG9pbCAoZm9yIGNvb2tpbmcgY3JlcGVzKQ0KDQojIyMjIyBGb3IgdGhlIEZpbGxpbmc6DQotIDIwMGcgZmlybSB0b2Z1LCBjdWJlZA0KLSAxIHRic3Agc295IHNhdWNlDQotIDEgdGJzcCBzZXNhbWUgb2lsDQotIDEgY3VwIGJlYW4gc3Byb3V0cw0KLSAxLzIgY3VwIHRoaW5seSBzbGljZWQgb25pb25zDQotIDEvMiBjdXAganVsaWVubmVkIGNhcnJvdHMNCi0gMS8yIGN1cCBzbGljZWQgbXVzaHJvb21zDQotIDEgdGJzcCB2ZWdldGFibGUgb2lsDQoNCiMjIyMjIEZvciB0aGUgTnVvYyBDaGFtOg0KLSAxLzQgY3VwIGxpbWUganVpY2UNCi0gMiB0YnNwIHN1Z2FyDQotIDIgdGJzcCBmaXNoIHNhdWNlIChvciBzb3kgc2F1Y2UgZm9yIHZlZ2FuKQ0KLSAyIGNsb3ZlcyBnYXJsaWMsIG1pbmNlZA0KLSAxIFRoYWkgY2hpbGksIGZpbmVseSBtaW5jZWQNCg0KIyMjIyMgRm9yIFNlcnZpbmc6DQotIEZyZXNoIGxldHR1Y2UgbGVhdmVzDQotIEZyZXNoIG1pbnQsIGJhc2lsLCBhbmQgY2lsYW50cm8NCi0gTGltZSB3ZWRnZXMNCg0KIyMjIEluc3RydWN0aW9uczoNCg0KIyMjIyAxLiBQcmVwYXJlIHRoZSBDcmVwZSBCYXR0ZXI6DQotIEluIGEgbWl4aW5nIGJvd2wsIGNvbWJpbmUgcmljZSBmbG91ciwgdHVybWVyaWMsIHNhbHQsIGNvY29udXQgbWlsaywgYW5kIHdhdGVyLg0KLSBXaGlzayB1bnRpbCBzbW9vdGgsIHRoZW4gZm9sZCBpbiB0aGUgc2xpY2VkIHNjYWxsaW9ucy4NCi0gU2V0IGFzaWRlIHRvIHJlc3QgZm9yIGFib3V0IDIwIG1pbnV0ZXMuDQoNCiMjIyMgMi4gUHJlcGFyZSB0aGUgRmlsbGluZzoNCi0gSGVhdCBzZXNhbWUgb2lsIGluIGEgcGFuIG92ZXIgbWVkaXVtIGhlYXQuDQotIEFkZCBjdWJlZCB0b2Z1IGFuZCBzYXV0w6kgdW50aWwgZ29sZGVuIGJyb3duLCBhYm91dCA1IG1pbnV0ZXMuDQotIEFkZCBzb3kgc2F1Y2UgYW5kIGNvbnRpbnVlIHRvIGNvb2sgZm9yIGFub3RoZXIgMiBtaW51dGVzLCB0aGVuIHJlbW92ZSBmcm9tIGhlYXQuDQotIEluIHRoZSBzYW1lIHBhbiwgYWRkIHZlZ2V0YWJsZSBvaWwgYW5kIHNhdXTDqSBvbmlvbnMsIGNhcnJvdHMsIGFuZCBtdXNocm9vbXMgdW50aWwgdGVuZGVyLg0KLSBBZGQgYmVhbiBzcHJvdXRzIGFuZCBzYXV0w6kgZm9yIGFuIGFkZGl0aW9uYWwgbWludXRlLiBNaXggaW4gdGhlIHRvZnUgYW5kIHNldCBhc2lkZS4NCg0KIyMjIyAzLiBQcmVwYXJlIHRoZSBOdW9jIENoYW06DQotIEluIGEgc21hbGwgYm93bCwgZGlzc29sdmUgc3VnYXIgaW4gbGltZSBqdWljZS4NCi0gU3RpciBpbiBmaXNoIHNhdWNlIChvciBzb3kgc2F1Y2UpLCBnYXJsaWMsIGFuZCBjaGlsaS4gU2V0IGFzaWRlLg0KDQojIyMjIDQuIENvb2sgdGhlIENyZXBlczoNCi0gSGVhdCBhIG5vbnN0aWNrIHNraWxsZXQgb3ZlciBtZWRpdW0taGlnaCBoZWF0Lg0KLSBMaWdodGx5IGNvYXQgdGhlIHBhbiB3aXRoIHZlZ2V0YWJsZSBvaWwuDQotIFBvdXIgYWJvdXQgMS80IGN1cCBvZiBiYXR0ZXIgaW50byB0aGUgaG90IHBhbiwgc3dpcmxpbmcgdG8gZXZlbmx5IGNvYXQgdGhlIGJvdHRvbSBvZiB0aGUgcGFuLg0KLSBDb29rIHVudGlsIGVkZ2VzIGFyZSBjcmlzcHkgYW5kIHNsaWdodGx5IGxpZnQgZnJvbSB0aGUgcGFuLCBhYm91dCAyLTMgbWludXRlcy4NCi0gQWRkIGEgcG9ydGlvbiBvZiB0aGUgdG9mdSBhbmQgdmVnZXRhYmxlIGZpbGxpbmcgdG8gb25lIGhhbGYgb2YgdGhlIGNyZXBlLg0KLSBGb2xkIHRoZSBjcmVwZSBvdmVyIHRoZSBmaWxsaW5nIGFuZCBnZW50bHkgcHJlc3MgZG93bi4NCi0gQ29vayBmb3IgYW4gYWRkaXRpb25hbCBtaW51dGUgdG8gZW5zdXJlIHRoZSBjcmVwZSBpcyBjcmlzcHkuDQotIFRyYW5zZmVyIHRvIGEgc2VydmluZyBwbGF0ZSBhbmQgcmVwZWF0IHdpdGggcmVtYWluaW5nIGJhdHRlci4NCg0KIyMjIyA1LiBTZXJ2ZToNCi0gU2VydmUgdGhlIELDoW5oIFjDqG8gaG90LCB3cmFwcGVkIGluIGZyZXNoIGxldHR1Y2Ugd2l0aCBmcmVzaCBoZXJicy4NCi0gRGlwIGluIHByZXBhcmVkIE51b2MgQ2hhbSBzYXVjZS4NCi0gQWNjb21wYW55IHdpdGggbGltZSB3ZWRnZXMuDQoNCiMjIyBXaW5lIFBhaXJpbmc6DQoqKlJpZXNsaW5nIERyLiBMb29zZW4gQmx1ZSBTbGF0ZSBLYWJpbmV0dCAyMDIwKiogLSBUaGUgY3Jpc3AgYWNpZGl0eSBhbmQgZnJ1aXR5IG5vdGVzIG9mIHRoaXMgUmllc2xpbmcgd2lsbCBjb21wbGVtZW50IHRoZSBzYXZvcnkgYW5kIHJlZnJlc2hpbmcgZWxlbWVudHMgb2YgdGhlIELDoW5oIFjDqG8u";export{I as default};
