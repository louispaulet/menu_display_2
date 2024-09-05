const I="data:text/markdown;base64,IyBCaXJjaCBTeXJ1cCBhbmQgQ2FyYW1lbGl6ZWQgU2t5ciBNb3Vzc2Ugd2l0aCBCbHVlYmVycnkgU29yYmV0DQoNCiMjIEluZ3JlZGllbnRzDQoNCiMjIyBGb3IgdGhlIENhcmFtZWxpemVkIFNreXIgTW91c3NlDQotIDIwMGcgU2t5ciAoSWNlbGFuZGljIHlvZ3VydCkNCi0gNTBnIHN1Z2FyDQotIDMwbWwgYmlyY2ggc3lydXANCi0gMjAwbWwgaGVhdnkgY3JlYW0NCi0gMiBzaGVldHMgZ2VsYXRpbg0KDQojIyMgRm9yIHRoZSBCbHVlYmVycnkgU29yYmV0DQotIDMwMGcgZnJlc2ggb3IgZnJvemVuIGJsdWViZXJyaWVzDQotIDEwMGcgc3VnYXINCi0gMTAwbWwgd2F0ZXINCi0gMSB0YWJsZXNwb29uIGxlbW9uIGp1aWNlDQoNCiMjIyBHYXJuaXNoDQotIEZyZXNoIGJsdWViZXJyaWVzDQotIE1pbnQgbGVhdmVzDQotIEJpcmNoIHN1Z2FyIGdsYXNzIChvcHRpb25hbCkNCg0KIyMgSW5zdHJ1Y3Rpb25zDQoNCiMjIyBDYXJhbWVsaXplZCBTa3lyIE1vdXNzZQ0KMS4gKipQcmVwYXJlIEdlbGF0aW46KiogU29hayB0aGUgZ2VsYXRpbiBzaGVldHMgaW4gY29sZCB3YXRlciBmb3IgYWJvdXQgNSBtaW51dGVzIHRvIHNvZnRlbi4NCjIuICoqQ2FyYW1lbGl6ZSBTa3lyOioqIFBsYWNlIHRoZSBTa3lyIGFuZCBzdWdhciBpbiBhIHNtYWxsIHNhdWNlcGFuIG92ZXIgbWVkaXVtIGhlYXQsIHN0aXJyaW5nIGNvbnN0YW50bHkgdW50aWwgdGhlIHN1Z2FyIGNhcmFtZWxpemVzIHNsaWdodGx5IGFuZCBibGVuZHMgd2l0aCB0aGUgU2t5ci4gUmVtb3ZlIGZyb20gaGVhdC4NCjMuICoqSW5jb3Jwb3JhdGUgR2VsYXRpbjoqKiBTcXVlZXplIG91dCBleGNlc3Mgd2F0ZXIgZnJvbSB0aGUgZ2VsYXRpbiBzaGVldHMgYW5kIHN0aXIgdGhlbSBpbnRvIHRoZSB3YXJtIGNhcmFtZWxpemVkIFNreXIgbWl4dHVyZSB1bnRpbCBjb21wbGV0ZWx5IGRpc3NvbHZlZC4gVGhlbiwgYWRkIHRoZSBiaXJjaCBzeXJ1cCBhbmQgc3RpciB0byBjb21iaW5lLg0KNC4gKipXaGlwIENyZWFtOioqIEluIGEgc2VwYXJhdGUgYm93bCwgd2hpcCB0aGUgY3JlYW0gdW50aWwgc29mdCBwZWFrcyBmb3JtLCB0aGVuIGdlbnRseSBmb2xkIGl0IGludG8gdGhlIFNreXIgbWl4dHVyZS4NCjUuICoqQ2hpbGwgTW91c3NlOioqIFRyYW5zZmVyIHRoZSBtb3Vzc2UgbWl4dHVyZSBpbnRvIGluZGl2aWR1YWwgc2VydmluZyBtb2xkcyBvciBnbGFzc2VzIGFuZCBjaGlsbCBpbiB0aGUgcmVmcmlnZXJhdG9yIGZvciBhdCBsZWFzdCAzIGhvdXJzLCBvciB1bnRpbCBzZXQuDQoNCiMjIyBCbHVlYmVycnkgU29yYmV0DQoxLiAqKk1ha2UgQmx1ZWJlcnJ5IFN5cnVwOioqIEluIGEgbWVkaXVtIHNhdWNlcGFuLCBjb21iaW5lIHRoZSBibHVlYmVycmllcywgc3VnYXIsIGFuZCB3YXRlci4gQnJpbmcgdG8gYSBzaW1tZXIgb3ZlciBtZWRpdW0gaGVhdCwgc3RpcnJpbmcgdW50aWwgdGhlIHN1Z2FyIGRpc3NvbHZlcyBhbmQgdGhlIGJsdWViZXJyaWVzIHJlbGVhc2UgdGhlaXIganVpY2UuIA0KMi4gKipCbGVuZCBhbmQgU3RyYWluOioqIE9uY2Ugc2ltbWVyZWQsIHRyYW5zZmVyIHRoZSBtaXh0dXJlIHRvIGEgYmxlbmRlciBhbmQgcHVyZWUgdW50aWwgc21vb3RoLiBTdHJhaW4gdGhlIHB1cmVlIHRocm91Z2ggYSBmaW5lIG1lc2ggc2lldmUgdG8gcmVtb3ZlIHNlZWRzIGFuZCBza2luLg0KMy4gKipGaW5pc2ggU29yYmV0IEJhc2U6KiogU3RpciBpbiB0aGUgbGVtb24ganVpY2UsIHRoZW4gY2hpbGwgdGhlIG1peHR1cmUgaW4gdGhlIHJlZnJpZ2VyYXRvciB1bnRpbCBjb21wbGV0ZWx5IGNvbGQuDQo0LiAqKkNodXJuIFNvcmJldDoqKiBQb3VyIHRoZSBjaGlsbGVkIGJsdWViZXJyeSBtaXh0dXJlIGludG8gYW4gaWNlIGNyZWFtIG1ha2VyIGFuZCBjaHVybiBhY2NvcmRpbmcgdG8gdGhlIG1hbnVmYWN0dXJlcidzIGluc3RydWN0aW9ucyB1bnRpbCBpdCByZWFjaGVzIGEgc29yYmV0IGNvbnNpc3RlbmN5LiBUcmFuc2ZlciB0byBhIGNvbnRhaW5lciBhbmQgZnJlZXplIGZvciBhdCBsZWFzdCAyIGhvdXJzIGJlZm9yZSBzZXJ2aW5nLg0KDQojIyBQbGF0aW5nDQoxLiBSZW1vdmUgdGhlIGNhcmFtZWxpemVkIFNreXIgbW91c3NlIGZyb20gdGhlIG1vbGRzIGFuZCBwbGFjZSBvbiBhIGNoaWxsZWQgcGxhdGUuIEFsdGVybmF0aXZlbHksIGlmIHVzaW5nIGdsYXNzZXMsIHNlcnZlIGRpcmVjdGx5IGFzIGlzLg0KMi4gQWRkIGEgc2Nvb3Agb2YgYmx1ZWJlcnJ5IHNvcmJldCBhbG9uZ3NpZGUgdGhlIG1vdXNzZS4NCjMuIEdhcm5pc2ggd2l0aCBmcmVzaCBibHVlYmVycmllcyBhbmQgbWludCBsZWF2ZXMuIEZvciBhZGRlZCBmbGFpciwgaW5jb3Jwb3JhdGUgYmlyY2ggc3VnYXIgZ2xhc3MgaWYgZGVzaXJlZC4NCg0KIyMgV2luZSBQYWlyaW5nDQpTZXJ2ZSB3aXRoIGEgZ2xhc3Mgb2YgSWNlIENpZGVyIERvbWFpbmUgTmVpZ2UgUHJlbWnDqHJlIDIwMTcgZm9yIGEgcGVyZmVjdCBiYWxhbmNlIG9mIHN3ZWV0bmVzcyBhbmQgYWNpZGl0eSwgZW5oYW5jaW5nIHRoZSBmbGF2b3JzIG9mIHRoZSBkZXNzZXJ0Lg==";export{I as default};
