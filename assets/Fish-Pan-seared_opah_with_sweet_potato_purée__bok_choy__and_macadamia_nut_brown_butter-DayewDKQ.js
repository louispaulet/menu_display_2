const I="data:text/markdown;base64,IyMgUGFuLVNlYXJlZCBPcGFoIHdpdGggU3dlZXQgUG90YXRvIFB1csOpZSwgQm9rIENob3ksIGFuZCBNYWNhZGFtaWEgTnV0IEJyb3duIEJ1dHRlcg0KDQojIyMgSW5ncmVkaWVudHMNCg0KIyMjIyBGb3IgdGhlIEZpc2gNCi0gNCBvcGFoIGZpbGxldHMsIGVhY2ggYWJvdXQgNiBvdW5jZXMNCi0gU2FsdCBhbmQgZnJlc2hseSBncm91bmQgYmxhY2sgcGVwcGVyLCB0byB0YXN0ZQ0KLSAyIHRhYmxlc3Bvb25zIG9saXZlIG9pbA0KDQojIyMjIEZvciB0aGUgU3dlZXQgUG90YXRvIFB1csOpZQ0KLSAyIGxhcmdlIHN3ZWV0IHBvdGF0b2VzLCBwZWVsZWQgYW5kIGN1YmVkDQotIDEgdGFibGVzcG9vbiBidXR0ZXINCi0gMS80IGN1cCBoZWF2eSBjcmVhbQ0KLSBTYWx0IGFuZCBmcmVzaGx5IGdyb3VuZCBibGFjayBwZXBwZXIsIHRvIHRhc3RlDQoNCiMjIyMgRm9yIHRoZSBCb2sgQ2hveQ0KLSA0IHNtYWxsIGJvayBjaG95LCBoYWx2ZWQgbGVuZ3Rod2lzZQ0KLSAxIHRhYmxlc3Bvb24gc2VzYW1lIG9pbA0KLSAxIGNsb3ZlIG9mIGdhcmxpYywgbWluY2VkDQotIDEgdGFibGVzcG9vbiBzb3kgc2F1Y2UNCi0gMSB0ZWFzcG9vbiBzZXNhbWUgc2VlZHMNCg0KIyMjIyBGb3IgdGhlIE1hY2FkYW1pYSBOdXQgQnJvd24gQnV0dGVyDQotIDEvMiBjdXAgbWFjYWRhbWlhIG51dHMsIHJvdWdobHkgY2hvcHBlZA0KLSA2IHRhYmxlc3Bvb25zIHVuc2FsdGVkIGJ1dHRlcg0KLSBaZXN0IG9mIDEgbGVtb24NCi0gMSB0ZWFzcG9vbiBmcmVzaCBsZW1vbiBqdWljZQ0KLSBTYWx0LCB0byB0YXN0ZQ0KDQojIyMgSW5zdHJ1Y3Rpb25zDQoNCiMjIyMgUHJlcGFyZSB0aGUgU3dlZXQgUG90YXRvIFB1csOpZQ0KMS4gSW4gYSBsYXJnZSBwb3QsIGJyaW5nIHdhdGVyIHRvIGEgYm9pbCBhbmQgYWRkIHN3ZWV0IHBvdGF0byBjdWJlcy4gQ29vayB1bnRpbCB0ZW5kZXIsIGFib3V0IDE1LTIwIG1pbnV0ZXMuDQoyLiBEcmFpbiB0aGUgc3dlZXQgcG90YXRvZXMgYW5kIHRyYW5zZmVyIHRvIGEgYmxlbmRlciBvciBmb29kIHByb2Nlc3Nvci4NCjMuIEFkZCBidXR0ZXIgYW5kIGhlYXZ5IGNyZWFtLCBibGVuZCB1bnRpbCBzbW9vdGguIFNlYXNvbiB3aXRoIHNhbHQgYW5kIHBlcHBlciB0byB0YXN0ZS4gU2V0IGFzaWRlIGFuZCBrZWVwIHdhcm0uDQoNCiMjIyMgUHJlcGFyZSB0aGUgQm9rIENob3kNCjEuIEhlYXQgc2VzYW1lIG9pbCBpbiBhIHNraWxsZXQgb3ZlciBtZWRpdW0gaGVhdC4gQWRkIG1pbmNlZCBnYXJsaWMgYW5kIHNhdXTDqSB1bnRpbCBmcmFncmFudCwgYWJvdXQgMSBtaW51dGUuDQoyLiBBZGQgYm9rIGNob3kgaGFsdmVzLCBjdXQtc2lkZSBkb3duLCBhbmQgY29vayBmb3IgYWJvdXQgMyBtaW51dGVzIG9yIHVudGlsIGxpZ2h0bHkgYnJvd25lZC4NCjMuIEZsaXAgYm9rIGNob3ksIGFkZCBzb3kgc2F1Y2UgYW5kIHNwcmlua2xlIHdpdGggc2VzYW1lIHNlZWRzLiBDb3ZlciBhbmQgY29vayBmb3IgYW5vdGhlciAyLTMgbWludXRlcywgdW50aWwgdGVuZGVyLiBSZW1vdmUgZnJvbSBoZWF0Lg0KDQojIyMjIFByZXBhcmUgdGhlIE1hY2FkYW1pYSBOdXQgQnJvd24gQnV0dGVyDQoxLiBJbiBhIHNtYWxsIHNhdWNlcGFuIG92ZXIgbWVkaXVtIGhlYXQsIG1lbHQgdGhlIGJ1dHRlci4NCjIuIENvbnRpbnVlIHRvIGNvb2sgdGhlIGJ1dHRlciwgc3RpcnJpbmcgb2NjYXNpb25hbGx5LCB1bnRpbCBpdCB0dXJucyBnb2xkZW4gYnJvd24gYW5kIHNtZWxscyBudXR0eSwgYWJvdXQgNSBtaW51dGVzLg0KMy4gQWRkIHRoZSBtYWNhZGFtaWEgbnV0cyBhbmQgY29udGludWUgY29va2luZyBmb3IgYW4gYWRkaXRpb25hbCAyIG1pbnV0ZXMuDQo0LiBSZW1vdmUgZnJvbSBoZWF0IGFuZCBzdGlyIGluIGxlbW9uIHplc3QsIGxlbW9uIGp1aWNlLCBhbmQgYSBwaW5jaCBvZiBzYWx0LiBTZXQgYXNpZGUuDQoNCiMjIyMgUGFuLVNlYXIgdGhlIE9wYWgNCjEuIFNlYXNvbiBvcGFoIGZpbGxldHMgd2l0aCBzYWx0IGFuZCBmcmVzaGx5IGdyb3VuZCBibGFjayBwZXBwZXIuDQoyLiBIZWF0IG9saXZlIG9pbCBpbiBhIGxhcmdlIHNraWxsZXQgb3ZlciBtZWRpdW0taGlnaCBoZWF0Lg0KMy4gQWRkIHRoZSBvcGFoIGZpbGxldHMgdG8gdGhlIHNraWxsZXQsIHNraW4tc2lkZSBkb3duLCBhbmQgY29vayBmb3IgMy00IG1pbnV0ZXMgcGVyIHNpZGUsIG9yIHVudGlsIGdvbGRlbiBicm93biBhbmQgY29va2VkIHRocm91Z2guDQo0LiBSZW1vdmUgZnJvbSBoZWF0IGFuZCBsZXQgcmVzdCBmb3IgYSBjb3VwbGUgb2YgbWludXRlcy4NCg0KIyMjIFRvIFNlcnZlDQotIFNwb29uIGEgZ2VuZXJvdXMgZG9sbG9wIG9mIHN3ZWV0IHBvdGF0byBwdXLDqWUgb250byB0aGUgY2VudGVyIG9mIGVhY2ggcGxhdGUuDQotIFBsYWNlIGEgc2VhcmVkIG9wYWggZmlsbGV0IG9uIHRvcCBvZiB0aGUgcHVyw6llLg0KLSBBcnJhbmdlIGJvayBjaG95IGJlc2lkZSB0aGUgb3BhaC4NCi0gRHJpenpsZSB0aGUgbWFjYWRhbWlhIG51dCBicm93biBidXR0ZXIgb3ZlciB0aGUgZmlzaCBhbmQgYXJvdW5kIHRoZSBwbGF0ZS4NCi0gU2VydmUgaW1tZWRpYXRlbHkgd2l0aCBhIGdsYXNzIG9mICoqQ2hhcmRvbm5heSBLaXN0bGVyIExlcyBOb2lzZXRpZXJzIDIwMTkqKi4NCg0KIyMjIEVuam95IHlvdXIgZWxlZ2FudGx5IHJlZmluZWQgbWVhbCB0aGF0IHNob3djYXNlcyB0aGUgb3B1bGVudCBmbGF2b3JzIG9mIG9wYWgsIGNvbXBsZW1lbnRlZCBieSB0aGUgY3JlYW15IHN3ZWV0bmVzcyBvZiB0aGUgcG90YXRvIHB1csOpZSwgdGhlIGNyaXNwIGZyZXNobmVzcyBvZiBib2sgY2hveSwgYW5kIHRoZSByaWNoLCBudXR0eSBub3RlcyBvZiB0aGUgbWFjYWRhbWlhIGJyb3duIGJ1dHRlci4=";export{I as default};
