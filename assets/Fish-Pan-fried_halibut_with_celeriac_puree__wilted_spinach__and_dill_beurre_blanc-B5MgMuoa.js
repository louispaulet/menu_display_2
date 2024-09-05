const G="data:text/markdown;base64,IyBQYW4tZnJpZWQgSGFsaWJ1dCB3aXRoIENlbGVyaWFjIFB1cmVlLCBXaWx0ZWQgU3BpbmFjaCwgYW5kIERpbGwgQmV1cnJlIEJsYW5jDQoNCiMjIEluZ3JlZGllbnRzDQoNCiMjIyBGb3IgdGhlIEhhbGlidXQ6DQotIDQgaGFsaWJ1dCBmaWxsZXRzIChhYm91dCA2b3ogZWFjaCkNCi0gU2FsdCBhbmQgcGVwcGVyLCB0byB0YXN0ZQ0KLSAyIHRhYmxlc3Bvb25zIG9saXZlIG9pbA0KLSAxIHRhYmxlc3Bvb24gdW5zYWx0ZWQgYnV0dGVyDQoNCiMjIyBGb3IgdGhlIENlbGVyaWFjIFB1cmVlOg0KLSAxIG1lZGl1bSBjZWxlcmlhYyAoY2VsZXJ5IHJvb3QpLCBwZWVsZWQgYW5kIGRpY2VkDQotIDIgdGFibGVzcG9vbnMgdW5zYWx0ZWQgYnV0dGVyDQotIDEvMiBjdXAgaGVhdnkgY3JlYW0NCi0gU2FsdCBhbmQgcGVwcGVyLCB0byB0YXN0ZQ0KDQojIyMgRm9yIHRoZSBXaWx0ZWQgU3BpbmFjaDoNCi0gMSB0YWJsZXNwb29uIG9saXZlIG9pbA0KLSAxIGxhcmdlIGdhcmxpYyBjbG92ZSwgdGhpbmx5IHNsaWNlZA0KLSAxMCBveiBmcmVzaCBzcGluYWNoIGxlYXZlcywgd2FzaGVkIGFuZCBkcmllZA0KLSBTYWx0LCB0byB0YXN0ZQ0KDQojIyMgRm9yIHRoZSBEaWxsIEJldXJyZSBCbGFuYzoNCi0gMjUwbWwgd2hpdGUgd2luZQ0KLSAxIHNoYWxsb3QsIGZpbmVseSBjaG9wcGVkDQotIDEwMGcgdW5zYWx0ZWQgYnV0dGVyLCBjaGlsbGVkIGFuZCBjdWJlZA0KLSAxIHRhYmxlc3Bvb24gZnJlc2hseSBjaG9wcGVkIGRpbGwNCi0gMSB0YWJsZXNwb29uIGxlbW9uIGp1aWNlDQotIFNhbHQgYW5kIHdoaXRlIHBlcHBlciwgdG8gdGFzdGUNCg0KIyMgSW5zdHJ1Y3Rpb25zDQoNCiMjIyBDZWxlcmlhYyBQdXJlZQ0KMS4gKipDb29rIHRoZSBDZWxlcmlhYzoqKiBQbGFjZSBkaWNlZCBjZWxlcmlhYyBpbnRvIGEgcG90IG9mIHNhbHRlZCBib2lsaW5nIHdhdGVyIGFuZCBjb29rIHVudGlsIGNvbXBsZXRlbHkgdGVuZGVyICgxNS0yMCBtaW51dGVzKS4NCjIuICoqQmxlbmQ6KiogRHJhaW4gdGhlIGNlbGVyaWFjIGFuZCB0cmFuc2ZlciB0byBhIGZvb2QgcHJvY2Vzc29yLiBBZGQgYnV0dGVyIGFuZCBjcmVhbSwgdGhlbiBibGVuZCB1bnRpbCBzbW9vdGguDQozLiAqKlNlYXNvbjoqKiBTZWFzb24gd2l0aCBzYWx0IGFuZCBwZXBwZXIuIEtlZXAgd2FybSB1bnRpbCByZWFkeSB0byBzZXJ2ZS4NCg0KIyMjIERpbGwgQmV1cnJlIEJsYW5jDQoxLiAqKlJlZHVjZToqKiBJbiBhIHNhdWNlcGFuLCBjb21iaW5lIHdoaXRlIHdpbmUgYW5kIHNoYWxsb3RzLiBCcmluZyB0byBhIHNpbW1lciBhbmQgcmVkdWNlIHVudGlsIG9ubHkgYSBmZXcgdGFibGVzcG9vbnMgcmVtYWluIChhYm91dCAxMC0xNSBtaW51dGVzKS4NCjIuICoqRW11bHNpZnk6KiogVHVybiBoZWF0IHRvIGxvdywgd2hpc2sgaW4gYnV0dGVyIG9uZSBwaWVjZSBhdCBhIHRpbWUgdW50aWwgZW11bHNpZmllZCBpbnRvIGEgY3JlYW15IHNhdWNlLg0KMy4gKipGbGF2b3IgYW5kIFNlYXNvbjoqKiBTdGlyIGluIHRoZSBjaG9wcGVkIGRpbGwgYW5kIGxlbW9uIGp1aWNlLCBzZWFzb24gdG8gdGFzdGUgd2l0aCBzYWx0IGFuZCBwZXBwZXIsIGFuZCBrZWVwIHdhcm0uDQoNCiMjIyBQYW4tZnJpZWQgSGFsaWJ1dA0KMS4gKipQcmVwYXJlIHRoZSBGaXNoOioqIFNlYXNvbiBib3RoIHNpZGVzIG9mIHRoZSBoYWxpYnV0IGZpbGxldHMgd2l0aCBzYWx0IGFuZCBwZXBwZXIuDQoyLiAqKlNlYXI6KiogSGVhdCBvbGl2ZSBvaWwgaW4gYSBsYXJnZSBza2lsbGV0IG92ZXIgbWVkaXVtLWhpZ2ggaGVhdC4gQWRkIHRoZSBmaWxsZXRzLCBza2luLXNpZGUgZG93biBpZiBhcHBsaWNhYmxlLiBDb29rIGZvciBhYm91dCAzIG1pbnV0ZXMuDQozLiAqKkZpbmlzaCBDb29raW5nOioqIEZsaXAgdGhlIGZpbGxldHMsIGFkZCBhIHRhYmxlc3Bvb24gb2YgYnV0dGVyLCBhbmQgY29vayBmb3IgYW5vdGhlciAyLTMgbWludXRlcyB1bnRpbCBjb29rZWQgdGhyb3VnaCBhbmQgZ29sZGVuLg0KDQojIyMgV2lsdGVkIFNwaW5hY2gNCjEuICoqU2F1dMOpOioqIEluIGEgbGFyZ2UgcGFuLCBoZWF0IG9saXZlIG9pbCBvdmVyIG1lZGl1bSBoZWF0LiBBZGQgZ2FybGljIGFuZCBzYXV0w6kgdW50aWwgZnJhZ3JhbnQuDQoyLiAqKldpbHQgdGhlIFNwaW5hY2g6KiogQWRkIHNwaW5hY2ggYW5kIGNvb2sgdW50aWwganVzdCB3aWx0ZWQuIFNlYXNvbiB3aXRoIHNhbHQuDQoNCiMjIEFzc2VtYmx5DQoxLiAqKlBsYXRlOioqIFNwcmVhZCBhIGdlbmVyb3VzIHNwb29uZnVsIG9mIGNlbGVyaWFjIHB1cmVlIG9uIGVhY2ggcGxhdGUuDQoyLiAqKkFycmFuZ2U6KiogVG9wIHdpdGggYSBoYWxpYnV0IGZpbGxldCwgcGxhY2Ugd2lsdGVkIHNwaW5hY2ggb24gdGhlIHNpZGUuDQozLiAqKlNhdWNlOioqIERyaXp6bGUgZGlsbCBiZXVycmUgYmxhbmMgb3ZlciB0aGUgZmlzaC4gDQoNCiMjIyBXaW5lIFBhaXJpbmcNCi0gKipSZWNvbW1lbmRhdGlvbjoqKiBTZXJ2ZSB3aXRoIFNhdXZpZ25vbiBCbGFuYywgQ2xvdWR5IEJheSBNYXJsYm9yb3VnaCAyMDIwLCB0byBjb21wbGVtZW50IHRoZSByaWNoIGFuZCBidXR0ZXJ5IGZsYXZvcnMgb2YgdGhlIGRpc2guDQoNCi0tLQ0KDQpFbmpveSB5b3VyIGV4cXVpc2l0ZWx5IHByZXBhcmVkIFBhbi1mcmllZCBIYWxpYnV0IHdpdGggaXRzIGRlbGlnaHRmdWwgYWNjb21wYW5pbWVudHMh";export{G as default};
