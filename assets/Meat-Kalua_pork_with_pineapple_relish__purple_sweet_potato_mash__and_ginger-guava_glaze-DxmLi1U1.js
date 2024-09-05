const I="data:text/markdown;base64,IyBLYWx1YSBQb3JrIHdpdGggUGluZWFwcGxlIFJlbGlzaCwgUHVycGxlIFN3ZWV0IFBvdGF0byBNYXNoLCBhbmQgR2luZ2VyLUd1YXZhIEdsYXplDQoNCiMjIEluZ3JlZGllbnRzDQoNCiMjIyBGb3IgdGhlIEthbHVhIFBvcms6DQotIDQtNSBsYnMgcG9yayBzaG91bGRlciAob3IgcG9yayBidXR0KQ0KLSAyIHRic3AgSGF3YWlpYW4gc2VhIHNhbHQgKG9yIGtvc2hlciBzYWx0KQ0KLSAyIHRic3AgbGlxdWlkIHNtb2tlDQotIDQgYmFuYW5hIGxlYXZlcyAob3B0aW9uYWwpDQoNCiMjIyBGb3IgdGhlIFBpbmVhcHBsZSBSZWxpc2g6DQotIDEgcmlwZSBwaW5lYXBwbGUsIHBlZWxlZCwgY29yZWQsIGFuZCBmaW5lbHkgZGljZWQNCi0gMSBzbWFsbCByZWQgb25pb24sIGZpbmVseSBkaWNlZA0KLSAxIHJlZCBiZWxsIHBlcHBlciwgZmluZWx5IGRpY2VkDQotIDIgdGJzcCBmcmVzaCBjaWxhbnRybywgY2hvcHBlZA0KLSBKdWljZSBvZiAxIGxpbWUNCi0gU2FsdCBhbmQgcGVwcGVyIHRvIHRhc3RlDQoNCiMjIyBGb3IgdGhlIFB1cnBsZSBTd2VldCBQb3RhdG8gTWFzaDoNCi0gMiBsYnMgcHVycGxlIHN3ZWV0IHBvdGF0b2VzLCBwZWVsZWQgYW5kIGN1YmVkDQotIMK8IGN1cCB1bnNhbHRlZCBidXR0ZXINCi0gwr0gY3VwIGNvY29udXQgbWlsaw0KLSBTYWx0IHRvIHRhc3RlDQoNCiMjIyBGb3IgdGhlIEdpbmdlci1HdWF2YSBHbGF6ZToNCi0gMSBjdXAgZ3VhdmEganVpY2UNCi0gMiB0YnNwIGZyZXNoIGdpbmdlciwgZ3JhdGVkDQotIDIgdGJzcCBicm93biBzdWdhcg0KLSAxIHRic3Agc295IHNhdWNlDQotIDEgdGJzcCByaWNlIHZpbmVnYXINCi0gMSB0c3AgY29ybnN0YXJjaCBtaXhlZCB3aXRoIDEgdGJzcCB3YXRlciAoc2x1cnJ5KQ0KDQojIyBJbnN0cnVjdGlvbnMNCg0KIyMjIFByZXBhcmluZyB0aGUgS2FsdWEgUG9yazoNCjEuICoqTWFyaW5hdGUgdGhlIFBvcms6KiogUnViIHRoZSBwb3JrIHNob3VsZGVyIHdpdGggSGF3YWlpYW4gc2VhIHNhbHQgYW5kIGxpcXVpZCBzbW9rZS4gSWYgdXNpbmcgYmFuYW5hIGxlYXZlcywgd3JhcCB0aGUgcG9yayB3aXRoIHRoZW0gdG8gYWRkIHN1YnRsZSBmbGF2b3IuDQoNCjIuICoqU2xvdyBDb29rIHRoZSBQb3JrOioqIFBsYWNlIHBvcmsgaW4gYSBzbG93IGNvb2tlciBvciBhIGR1dGNoIG92ZW4uIENvb2sgb24gbG93IGZvciA4LTkgaG91cnMgb3IgdW50aWwgdGhlIG1lYXQgaXMgdGVuZGVyIGFuZCBjYW4gZWFzaWx5IGJlIHNocmVkZGVkIHdpdGggYSBmb3JrLg0KDQozLiAqKlNocmVkIHRoZSBQb3JrOioqIE9uY2UgY29va2VkLCByZW1vdmUgdGhlIHBvcmssIGRpc2NhcmQgYmFuYW5hIGxlYXZlcywgYW5kIHNocmVkIHRoZSBtZWF0IHVzaW5nIHR3byBmb3Jrcy4gS2VlcCB3YXJtLg0KDQojIyMgTWFraW5nIHRoZSBQaW5lYXBwbGUgUmVsaXNoOg0KMS4gKipNaXggdGhlIEluZ3JlZGllbnRzOioqIEluIGEgbWVkaXVtIGJvd2wsIGNvbWJpbmUgZGljZWQgcGluZWFwcGxlLCByZWQgb25pb24sIHJlZCBiZWxsIHBlcHBlciwgYW5kIGNpbGFudHJvLg0KDQoyLiAqKlNlYXNvbiB0aGUgUmVsaXNoOioqIEFkZCBsaW1lIGp1aWNlLCBzYWx0LCBhbmQgcGVwcGVyIHRvIHRhc3RlLCBhbmQgbWl4IHdlbGwuIExldCB0aGUgcmVsaXNoIHNpdCBmb3IgYXQgbGVhc3QgMTUgbWludXRlcyB0byBtZWxkIGZsYXZvcnMuDQoNCiMjIyBQcmVwYXJpbmcgdGhlIFB1cnBsZSBTd2VldCBQb3RhdG8gTWFzaDoNCjEuICoqQm9pbCB0aGUgUG90YXRvZXM6KiogUGxhY2Ugc3dlZXQgcG90YXRvZXMgaW4gYSBsYXJnZSBwb3QsIGNvdmVyIHdpdGggd2F0ZXIsIGFuZCBicmluZyB0byBhIGJvaWwuIENvb2sgdW50aWwgdGVuZGVyLCBhYm91dCAxNS0yMCBtaW51dGVzLg0KDQoyLiAqKk1hc2ggdGhlIFBvdGF0b2VzOioqIERyYWluIHdlbGwgYW5kIHJldHVybiB0byBwb3QuIEFkZCBidXR0ZXIgYW5kIGNvY29udXQgbWlsaywgdGhlbiBtYXNoIHVudGlsIHNtb290aC4gU2Vhc29uIHdpdGggc2FsdCB0byB0YXN0ZS4NCg0KIyMjIE1ha2luZyB0aGUgR2luZ2VyLUd1YXZhIEdsYXplOg0KMS4gKipDb21iaW5lIGFuZCBIZWF0IEluZ3JlZGllbnRzOioqIEluIGEgc21hbGwgc2F1Y2VwYW4sIGNvbWJpbmUgZ3VhdmEganVpY2UsIGdyYXRlZCBnaW5nZXIsIGJyb3duIHN1Z2FyLCBzb3kgc2F1Y2UsIGFuZCByaWNlIHZpbmVnYXIuIEJyaW5nIHRvIGEgbG93IHNpbW1lciBvdmVyIG1lZGl1bSBoZWF0Lg0KDQoyLiAqKlRoaWNrZW4gdGhlIEdsYXplOioqIFN0aXIgaW4gdGhlIGNvcm5zdGFyY2ggc2x1cnJ5IGFuZCBjb29rIHVudGlsIHRoZSBtaXh0dXJlIHNsaWdodGx5IHRoaWNrZW5zLCBhYm91dCAyLTMgbWludXRlcy4gUmVtb3ZlIGZyb20gaGVhdC4NCg0KIyMjIFBsYXRpbmcgdGhlIERpc2g6DQoxLiAqKkFzc2VtYmxlIHRoZSBQbGF0ZToqKiBQbGFjZSBhIGdlbmVyb3VzIHNjb29wIG9mIHB1cnBsZSBzd2VldCBwb3RhdG8gbWFzaCBvbiBlYWNoIHBsYXRlLiBUb3Agd2l0aCBhIHBvcnRpb24gb2Ygc2hyZWRkZWQgS2FsdWEgcG9yay4NCg0KMi4gKipHYXJuaXNoIHdpdGggUmVsaXNoIGFuZCBHbGF6ZToqKiBTcG9vbiBzb21lIHBpbmVhcHBsZSByZWxpc2ggb3ZlciB0aGUgcG9yayBhbmQgZHJpenpsZSB3aXRoIGdpbmdlci1ndWF2YSBnbGF6ZS4NCg0KMy4gKipTZXJ2ZToqKiBTZXJ2ZSBpbW1lZGlhdGVseSB3aXRoIGEgZ2xhc3Mgb2YgUGlub3QgTm9pciBEb21haW5lIFNlcmVuZSBZYW1oaWxsIEN1dsOpZSAyMDE4IGZvciBhIGNvbXBsZXRlIGRpbmluZyBleHBlcmllbmNlLg0KDQpFbmpveSB0aGlzIHRyb3BpY2FsIGFuZCBhcm9tYXRpYyBkaXNoIHRoYXQgY29tYmluZXMgdGVuZGVyIHBvcmsgd2l0aCBicmlnaHQsIHZpYnJhbnQgZmxhdm9ycyBhbmQgYSBkZWxpZ2h0ZnVsIGZpbmlzaCBmcm9tIHRoZSBQaW5vdCBOb2lyIQ==";export{I as default};
