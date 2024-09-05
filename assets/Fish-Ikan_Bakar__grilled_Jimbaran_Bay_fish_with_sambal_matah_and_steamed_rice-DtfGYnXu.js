const g="data:text/markdown;base64,IyBJa2FuIEJha2FyIHdpdGggU2FtYmFsIE1hdGFoIGFuZCBTdGVhbWVkIFJpY2UNCg0KVHJhbnNwb3J0IHlvdXJzZWxmIHRvIHRoZSBiZWFjaGVzIG9mIEJhbGkgd2l0aCB0aGlzIGFyb21hdGljIGFuZCBzcGljeSBJbmRvbmVzaWFuIGRlbGlnaHTigJRzdWNjdWxlbnQgZ3JpbGxlZCBmaXNoLCBrbm93biBhcyAiSWthbiBCYWthciwiIHBlcmZlY3RseSBjb21wbGVtZW50ZWQgYnkgdGhlIGZyZXNoIGFuZCBmaWVyeSBTYW1iYWwgTWF0YWguDQoNCi0tLQ0KDQojIyBJbmdyZWRpZW50cw0KDQojIyMgRm9yIHRoZSBGaXNoOg0KLSAxIHdob2xlIGZpc2ggKHNuYXBwZXIgb3Igc2VhIGJhc3MgcHJlZmVycmVkKSwgY2xlYW5lZCBhbmQgc2NhbGVkLCBhYm91dCAxLjUgdG8gMiBwb3VuZHMNCi0gMyBjbG92ZXMgZ2FybGljLCBtaW5jZWQNCi0gMSB0YWJsZXNwb29uIHNoYWxsb3RzLCBtaW5jZWQNCi0gMiB0YWJsZXNwb29ucyB0YW1hcmluZCBwYXN0ZQ0KLSAxIHRhYmxlc3Bvb24gc295IHNhdWNlDQotIDEgdGFibGVzcG9vbiBsaW1lIGp1aWNlDQotIDEgdGVhc3Bvb24gc2FsdA0KLSAxIHRhYmxlc3Bvb24gcGFsbSBzdWdhciBvciBicm93biBzdWdhcg0KLSAyIHRhYmxlc3Bvb25zIHZlZ2V0YWJsZSBvaWwNCg0KIyMjIEZvciB0aGUgU2FtYmFsIE1hdGFoOg0KLSA1IHNoYWxsb3RzLCB0aGlubHkgc2xpY2VkDQotIDMgbGVtb25ncmFzcyBzdGFsa3MsIHRoaW5seSBzbGljZWQgKHdoaXRlIHBhcnRzIG9ubHkpDQotIDgga2FmZmlyIGxpbWUgbGVhdmVzLCBmaW5lbHkgY2hvcHBlZA0KLSAxMCBiaXJkJ3MgZXllIGNoaWxpZXMsIHRoaW5seSBzbGljZWQgKGFkanVzdCB0byB0YXN0ZSkNCi0gMiB0YWJsZXNwb29ucyBjb2NvbnV0IG9pbCwgbWVsdGVkDQotIDEgdGVhc3Bvb24gc2FsdA0KLSAxIHRhYmxlc3Bvb24gbGltZSBqdWljZQ0KLSAxIHRhYmxlc3Bvb24gZmlzaCBzYXVjZQ0KDQojIyMgRm9yIHRoZSBTdGVhbWVkIFJpY2U6DQotIDIgY3VwcyBqYXNtaW5lIHJpY2UNCi0gMyBjdXBzIHdhdGVyDQoNCiMjIyBXaW5lIFBhaXJpbmc6DQotICoqUGFzY2FsIEpvbGl2ZXQgUG91aWxseS1GdW3DqSAyMDIwKiogLSBBIGNyaXNwIGFuZCBtaW5lcmFsIHdoaXRlIHdpbmUgZnJvbSB0aGUgTG9pcmUgVmFsbGV5LCBwZXJmZWN0IHRvIGNvbXBsZW1lbnQgdGhlIHNhdm9yeSBhbmQgc3BpY3kgbm90ZXMgb2YgdGhlIGRpc2guDQoNCi0tLQ0KDQojIyBJbnN0cnVjdGlvbnMNCg0KIyMjIFByZXBhcmluZyB0aGUgRmlzaDoNCjEuIEluIGEgc21hbGwgYm93bCwgbWl4IHRoZSBtaW5jZWQgZ2FybGljLCBzaGFsbG90cywgdGFtYXJpbmQgcGFzdGUsIHNveSBzYXVjZSwgbGltZSBqdWljZSwgc2FsdCwgc3VnYXIsIGFuZCB2ZWdldGFibGUgb2lsIHRvIGZvcm0gYSBtYXJpbmFkZS4NCjIuIFNjb3JlIHRoZSBmaXNoIG9uIGJvdGggc2lkZXMgdG8gYWxsb3cgdGhlIG1hcmluYWRlIHRvIHBlbmV0cmF0ZS4NCjMuIFJ1YiB0aGUgbWFyaW5hZGUgZ2VuZXJvdXNseSBvdmVyIHRoZSBmaXNoLCBtYWtpbmcgc3VyZSB0byBnZXQgaW50byB0aGUgc2NvcmVkIGFyZWFzLiBMZXQgaXQgbWFyaW5hdGUgZm9yIGF0IGxlYXN0IDMwIG1pbnV0ZXMgaW4gdGhlIHJlZnJpZ2VyYXRvci4NCg0KIyMjIEdyaWxsaW5nIHRoZSBGaXNoOg0KNC4gUHJlaGVhdCB5b3VyIGdyaWxsIHRvIG1lZGl1bS1oaWdoIGhlYXQuDQo1LiBMaWdodGx5IG9pbCB0aGUgZ3JpbGwgZ3JhdGVzIHRvIHByZXZlbnQgdGhlIGZpc2ggZnJvbSBzdGlja2luZy4NCjYuIEdyaWxsIHRoZSBmaXNoLCBza2luIHNpZGUgZG93biBpbml0aWFsbHksIGZvciBhYm91dCAxMCBtaW51dGVzIHBlciBzaWRlIG9yIHVudGlsIHRoZSBmbGVzaCBlYXNpbHkgZmxha2VzIHdpdGggYSBmb3JrLg0KDQojIyMgTWFraW5nIFNhbWJhbCBNYXRhaDoNCjcuIFdoaWxlIHRoZSBmaXNoIGlzIGdyaWxsaW5nLCBwcmVwYXJlIHRoZSBTYW1iYWwgTWF0YWggYnkgY29tYmluaW5nIGFsbCB0aGUgaW5ncmVkaWVudHMgaW4gYSBib3dsLiBNaXggd2VsbCB0byBlbnN1cmUgYW4gZXZlbiBkaXN0cmlidXRpb24gb2YgZmxhdm9ycy4NCjguIFRhc3RlIHRoZSBzYW1iYWwgYW5kIGFkanVzdCBzZWFzb25pbmcgd2l0aCBzYWx0IG9yIGxpbWUgYXMgZGVzaXJlZC4NCg0KIyMjIENvb2tpbmcgdGhlIFN0ZWFtZWQgUmljZToNCjkuIFJpbnNlIHRoZSBqYXNtaW5lIHJpY2UgdW5kZXIgY29sZCB3YXRlciB1bnRpbCB0aGUgd2F0ZXIgcnVucyBjbGVhciB0byByZW1vdmUgZXhjZXNzIHN0YXJjaC4NCjEwLiBJbiBhIHBvdCwgY29tYmluZSB0aGUgcmluc2VkIHJpY2UgYW5kIHdhdGVyLiBCcmluZyB0byBhIGJvaWwgb3ZlciBtZWRpdW0gaGVhdC4NCjExLiBPbmNlIGJvaWxpbmcsIHJlZHVjZSB0aGUgaGVhdCB0byBsb3csIGNvdmVyLCBhbmQgbGV0IHNpbW1lciBmb3IgYWJvdXQgMTUtMjAgbWludXRlcyBvciB1bnRpbCB0aGUgd2F0ZXIgaXMgYWJzb3JiZWQgYW5kIHRoZSByaWNlIGlzIHRlbmRlci4NCjEyLiBGbHVmZiB0aGUgcmljZSB3aXRoIGEgZm9yayBiZWZvcmUgc2VydmluZy4NCg0KIyMjIFNlcnZpbmc6DQoxMy4gU2VydmUgdGhlIGdyaWxsZWQgZmlzaCBob3QsIHRvcHBlZCB3aXRoIGEgZ2VuZXJvdXMgc3Bvb25mdWwgb2YgU2FtYmFsIE1hdGFoLg0KMTQuIEFjY29tcGFueSB3aXRoIHN0ZWFtZWQgamFzbWluZSByaWNlLg0KMTUuIFBvdXIgYSBnbGFzcyBvZiBQYXNjYWwgSm9saXZldCBQb3VpbGx5LUZ1bcOpIDIwMjAgdG8gZW5oYW5jZSB0aGUgbWVhbC4NCg0KLS0tDQoNCioqRW5qb3kgeW91ciBkaW5pbmcgZXhwZXJpZW5jZSByZW1pbmlzY2VudCBvZiBhIHRyYW5xdWlsIGV2ZW5pbmcgYXQgSmltYmFyYW4gQmF5Lioq";export{g as default};
