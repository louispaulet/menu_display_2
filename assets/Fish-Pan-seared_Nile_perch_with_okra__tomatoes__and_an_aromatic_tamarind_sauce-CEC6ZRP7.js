const I="data:text/markdown;base64,IyBQYW4tc2VhcmVkIE5pbGUgUGVyY2ggd2l0aCBPa3JhLCBUb21hdG9lcywgYW5kIEFyb21hdGljIFRhbWFyaW5kIFNhdWNlDQoNCiMjIEluZ3JlZGllbnRzDQoNCiMjIyBGb3IgdGhlIEZpc2gNCi0gNCBOaWxlIHBlcmNoIGZpbGxldHMgKGFyb3VuZCAyMDBnIGVhY2gpDQotIFNhbHQgYW5kIGZyZXNobHkgZ3JvdW5kIGJsYWNrIHBlcHBlcg0KLSAyIHRhYmxlc3Bvb25zIG9saXZlIG9pbA0KLSAxIHRhYmxlc3Bvb24gYnV0dGVyDQoNCiMjIyBGb3IgdGhlIFRhbWFyaW5kIFNhdWNlDQotIDIgdGFibGVzcG9vbnMgdGFtYXJpbmQgcGFzdGUNCi0gMSBjdXAgZmlzaCBvciB2ZWdldGFibGUgc3RvY2sNCi0gMiB0YWJsZXNwb29ucyBzb3kgc2F1Y2UNCi0gMSB0YWJsZXNwb29uIGhvbmV5DQotIDIgY2xvdmVzIGdhcmxpYywgbWluY2VkDQotIDEgc21hbGwgb25pb24sIGZpbmVseSBjaG9wcGVkDQotIDEgdGFibGVzcG9vbiBncmF0ZWQgZnJlc2ggZ2luZ2VyDQotIDEgcmVkIGNoaWxpLCBmaW5lbHkgY2hvcHBlZCAob3B0aW9uYWwpDQotIDEgdGFibGVzcG9vbiB2ZWdldGFibGUgb2lsDQoNCiMjIyBGb3IgdGhlIFZlZ2V0YWJsZXMNCi0gMjAwZyBmcmVzaCBva3JhLCB0cmltbWVkIGFuZCBoYWx2ZWQNCi0gMiBsYXJnZSB0b21hdG9lcywgY2hvcHBlZA0KLSAyIHRhYmxlc3Bvb25zIG9saXZlIG9pbA0KLSBTYWx0IGFuZCBmcmVzaGx5IGdyb3VuZCBibGFjayBwZXBwZXINCg0KIyMgSW5zdHJ1Y3Rpb25zDQoNCiMjIyBQcmVwYXJlIHRoZSBTYXVjZQ0KMS4gKipTYXV0w6kgQXJvbWF0aWNzOioqIEluIGEgc21hbGwgc2F1Y2VwYW4sIGhlYXQgdGhlIHZlZ2V0YWJsZSBvaWwgb3ZlciBtZWRpdW0gaGVhdC4gQWRkIG9uaW9uLCBnYXJsaWMsIGdpbmdlciwgYW5kIHJlZCBjaGlsaS4gQ29vaywgc3RpcnJpbmcgZnJlcXVlbnRseSwgdW50aWwgdGhlIG9uaW9uIHNvZnRlbnMgYW5kIHR1cm5zIHRyYW5zbHVjZW50LCBhYm91dCA0LTUgbWludXRlcy4NCg0KMi4gKipNYWtlIHRoZSBTYXVjZToqKiBTdGlyIGluIHRoZSB0YW1hcmluZCBwYXN0ZSwgZmlzaCBvciB2ZWdldGFibGUgc3RvY2ssIHNveSBzYXVjZSwgYW5kIGhvbmV5LiBCcmluZyB0byBhIHNpbW1lciBhbmQgbGV0IGl0IHJlZHVjZSBzbGlnaHRseSB1bnRpbCBpdCB0aGlja2Vucy4gQWRqdXN0IHNlYXNvbmluZyB3aXRoIHNhbHQgYW5kIHBlcHBlciwgdHVybiBvZmYgdGhlIGhlYXQsIGFuZCBzZXQgYXNpZGUuDQoNCiMjIyBDb29rIHRoZSBWZWdldGFibGVzDQoxLiAqKlNhdXTDqSBPa3JhIGFuZCBUb21hdG9lczoqKiBJbiBhIGxhcmdlIHNraWxsZXQsIGhlYXQgb2xpdmUgb2lsIG92ZXIgbWVkaXVtLWhpZ2ggaGVhdC4gQWRkIHRoZSBva3JhIGFuZCB0b21hdG9lcy4gU2Vhc29uIHdpdGggc2FsdCBhbmQgcGVwcGVyLg0KICAgDQoyLiAqKkNvb2sgVmVnZXRhYmxlczoqKiBTYXV0w6kgZm9yIGFib3V0IDctOCBtaW51dGVzLCBzdGlycmluZyBvY2Nhc2lvbmFsbHksIHVudGlsIHRoZSBva3JhIGlzIHRlbmRlciBhbmQgdGhlIHRvbWF0b2VzIHN0YXJ0IHRvIGJyZWFrIGRvd24uIEtlZXAgd2FybS4NCg0KIyMjIENvb2sgdGhlIEZpc2gNCjEuICoqU2Vhc29uIHRoZSBGaXNoOioqIFBhdCB0aGUgcGVyY2ggZmlsbGV0cyBkcnkgd2l0aCBhIHBhcGVyIHRvd2VsLiBTZWFzb24gYm90aCBzaWRlcyB3aXRoIHNhbHQgYW5kIHBlcHBlci4NCg0KMi4gKipTZWFyIHRoZSBGaXNoOioqIEluIGEgbGFyZ2Ugbm9uLXN0aWNrIHNraWxsZXQsIGhlYXQgb2xpdmUgb2lsIG92ZXIgbWVkaXVtLWhpZ2ggaGVhdC4gQWRkIHRoZSBidXR0ZXIsIGFsbG93aW5nIGl0IHRvIG1lbHQgYW5kIGZvYW0gc2xpZ2h0bHkuDQoNCjMuICoqQ29vazoqKiBQbGFjZSB0aGUgcGVyY2ggZmlsbGV0cyBpbnRvIHRoZSBza2lsbGV0LiBDb29rIGZvciBhYm91dCAzLTQgbWludXRlcyBvbiBlYWNoIHNpZGUsIHVudGlsIGdvbGRlbiBicm93biBhbmQgY29va2VkIHRocm91Z2guIFRoZSBmaXNoIHNob3VsZCBlYXNpbHkgZmxha2Ugd2l0aCBhIGZvcmsuDQoNCiMjIyBUbyBTZXJ2ZQ0KMS4gKipQbGF0ZSBVcDoqKiBQbGFjZSBhIGJlZCBvZiBzYXV0w6llZCBva3JhIGFuZCB0b21hdG9lcyBvbiBlYWNoIHBsYXRlLg0KDQoyLiAqKkFkZCBGaXNoOioqIExheSB0aGUgcGFuLXNlYXJlZCBwZXJjaCBvbiB0b3Agb2YgdGhlIHZlZ2V0YWJsZXMuDQoNCjMuICoqRmluaXNoIHdpdGggU2F1Y2U6KiogRHJpenpsZSB0aGUgYXJvbWF0aWMgdGFtYXJpbmQgc2F1Y2Ugb3ZlciB0aGUgZmlzaCBhbmQgdmVnZXRhYmxlcy4NCg0KNC4gKipQYWlyaW5nIFN1Z2dlc3Rpb246KiogU2VydmUgaW1tZWRpYXRlbHkgd2l0aCBhIGNoaWxsZWQgZ2xhc3Mgb2YgQ2VkZXJiZXJnIFNhdXZpZ25vbiBCbGFuYyAyMDIwIGZvciBhIGRlbGlnaHRmdWwgY29tcGxlbWVudGFyeSBwYWlyaW5nLg0KDQotLS0NCkVuam95IHlvdXIgc29waGlzdGljYXRlZCwgTWljaGVsaW4tc3RhciBpbnNwaXJlZCBkaW5pbmcgZXhwZXJpZW5jZSBhdCBob21lIQ==";export{I as default};
