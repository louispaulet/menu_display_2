const G="data:text/markdown;base64,IyBCbGFjayBGb3Jlc3QgQ2FrZSB3aXRoIENoZXJyeSBDb21wb3RlIGFuZCBLaXJzY2gtaW5mdXNlZCBXaGlwcGVkIENyZWFtDQoNCiMjIERlc2NyaXB0aW9uDQpBIGRlY2FkZW50IGFuZCBsdXNjaW91cyBCbGFjayBGb3Jlc3QgQ2FrZSBjb21wcmlzaW5nIGxheWVycyBvZiByaWNoIGNob2NvbGF0ZSBzcG9uZ2UsIGEgdGFydCBjaGVycnkgY29tcG90ZSwgYW5kIGFyb21hdGljIGtpcnNjaC1pbmZ1c2VkIHdoaXBwZWQgY3JlYW0sIHBlcmZlY3RseSBwYWlyZWQgd2l0aCB0aGUgc3dlZXQgYW5kIGZsb3JhbCBub3RlcyBvZiBhIE3DvGxsZXItQ2F0b2lyIEhhYXJkdGVyIELDvHJnZXJnYXJ0ZW4gUmllc2xhbmVyIEF1c2xlc2UgMjAxNy4NCg0KIyMgSW5ncmVkaWVudHMNCg0KIyMjIENob2NvbGF0ZSBTcG9uZ2UgQ2FrZQ0KLSAxIGN1cCBhbGwtcHVycG9zZSBmbG91cg0KLSAxLzIgY3VwIHVuc3dlZXRlbmVkIGNvY29hIHBvd2Rlcg0KLSAxIHRlYXNwb29uIGJha2luZyBzb2RhDQotIDEvNCB0ZWFzcG9vbiBzYWx0DQotIDEgY3VwIGdyYW51bGF0ZWQgc3VnYXINCi0gMS8yIGN1cCB1bnNhbHRlZCBidXR0ZXIsIHNvZnRlbmVkDQotIDIgbGFyZ2UgZWdncw0KLSAxIHRlYXNwb29uIHZhbmlsbGEgZXh0cmFjdA0KLSAzLzQgY3VwIGJ1dHRlcm1pbGsNCg0KIyMjIENoZXJyeSBDb21wb3RlDQotIDIgY3VwcyBmcmVzaCBvciBmcm96ZW4gY2hlcnJpZXMsIHBpdHRlZA0KLSAxLzQgY3VwIGdyYW51bGF0ZWQgc3VnYXINCi0gMiB0YWJsZXNwb29ucyBsZW1vbiBqdWljZQ0KLSAyIHRhYmxlc3Bvb25zIGtpcnNjaCAoY2hlcnJ5IGJyYW5keSkNCg0KIyMjIEtpcnNjaC1pbmZ1c2VkIFdoaXBwZWQgQ3JlYW0NCi0gMSAxLzIgY3VwcyBoZWF2eSBjcmVhbQ0KLSAyIHRhYmxlc3Bvb25zIHBvd2RlcmVkIHN1Z2FyDQotIDIgdGFibGVzcG9vbnMga2lyc2NoDQotIDEgdGVhc3Bvb24gdmFuaWxsYSBleHRyYWN0DQoNCiMjIyBBZGRpdGlvbmFsDQotIERhcmsgY2hvY29sYXRlIHNoYXZpbmdzIGZvciBnYXJuaXNoDQotIEZyZXNoIGNoZXJyaWVzLCBmb3IgZ2FybmlzaA0KDQojIyBJbnN0cnVjdGlvbnMNCg0KIyMjIENob2NvbGF0ZSBTcG9uZ2UgQ2FrZQ0KMS4gKipQcmVoZWF0IHRoZSBPdmVuOioqIFByZWhlYXQgeW91ciBvdmVuIHRvIDM1MMKwRiAoMTc1wrBDKS4gR3JlYXNlIGFuZCBsaW5lIHR3byA4LWluY2ggcm91bmQgY2FrZSBwYW5zIHdpdGggcGFyY2htZW50IHBhcGVyLg0KMi4gKipNaXggRHJ5IEluZ3JlZGllbnRzOioqIEluIGEgYm93bCwgd2hpc2sgdG9nZXRoZXIgdGhlIGZsb3VyLCBjb2NvYSBwb3dkZXIsIGJha2luZyBzb2RhLCBhbmQgc2FsdC4NCjMuICoqQ3JlYW0gQnV0dGVyIGFuZCBTdWdhcjoqKiBJbiBhIHNlcGFyYXRlIGJvd2wsIGNyZWFtIHRoZSBzdWdhciBhbmQgYnV0dGVyIHRvZ2V0aGVyIHVudGlsIGxpZ2h0IGFuZCBmbHVmZnkuIEFkZCBpbiB0aGUgZWdncywgb25lIGF0IGEgdGltZSwgZm9sbG93ZWQgYnkgdGhlIHZhbmlsbGEsIG1peGluZyB3ZWxsIGJldHdlZW4gZWFjaCBhZGRpdGlvbi4NCjQuICoqQ29tYmluZSBJbmdyZWRpZW50czoqKiBHcmFkdWFsbHkgYWRkIHRoZSBkcnkgaW5ncmVkaWVudHMgdG8gdGhlIGJ1dHRlciBtaXh0dXJlLCBhbHRlcm5hdGluZyB3aXRoIHRoZSBidXR0ZXJtaWxrLCBzdGFydGluZyBhbmQgZW5kaW5nIHdpdGggZHJ5IGluZ3JlZGllbnRzLg0KNS4gKipCYWtlOioqIERpdmlkZSB0aGUgYmF0dGVyIGV2ZW5seSBiZXR3ZWVuIHRoZSBwcmVwYXJlZCBwYW5zIGFuZCBiYWtlIGZvciAyMC0yNSBtaW51dGVzIG9yIHVudGlsIGEgdG9vdGhwaWNrIGluc2VydGVkIGludG8gdGhlIGNlbnRlciBjb21lcyBvdXQgY2xlYW4uDQo2LiAqKkNvb2w6KiogQWxsb3cgdGhlIGNha2VzIHRvIGNvb2wgaW4gdGhlIHBhbnMgZm9yIDEwIG1pbnV0ZXMsIHRoZW4gdHVybiB0aGVtIG91dCBvbnRvIGEgd2lyZSByYWNrIHRvIGNvb2wgY29tcGxldGVseS4NCg0KIyMjIENoZXJyeSBDb21wb3RlDQoxLiAqKkNvb2sgQ2hlcnJpZXM6KiogSW4gYSBzYXVjZXBhbiwgY29tYmluZSBjaGVycmllcywgc3VnYXIsIGFuZCBsZW1vbiBqdWljZS4gQ29vayBvdmVyIG1lZGl1bSBoZWF0LCBzdGlycmluZyBvY2Nhc2lvbmFsbHksIHVudGlsIHRoZSBtaXh0dXJlIGlzIHN5cnVweSBhbmQgdGhlIGNoZXJyaWVzIGFyZSBzb2Z0LCBhYm91dCAxMCBtaW51dGVzLg0KMi4gKipBZGQgS2lyc2NoOioqIFN0aXIgaW4gdGhlIGtpcnNjaCBhbmQgc2ltbWVyIGZvciBhbiBhZGRpdGlvbmFsIDIgbWludXRlcy4gUmVtb3ZlIGZyb20gaGVhdCBhbmQgbGV0IGNvb2wuDQoNCiMjIyBLaXJzY2gtaW5mdXNlZCBXaGlwcGVkIENyZWFtDQoxLiAqKldoaXAgQ3JlYW06KiogSW4gYSBjaGlsbGVkIGJvd2wsIHdoaXAgdGhlIGhlYXZ5IGNyZWFtIHVudGlsIHNvZnQgcGVha3MgZm9ybS4NCjIuICoqRmxhdm9yIENyZWFtOioqIEFkZCBwb3dkZXJlZCBzdWdhciwga2lyc2NoLCBhbmQgdmFuaWxsYSB0byB0aGUgd2hpcHBlZCBjcmVhbSBhbmQgY29udGludWUgd2hpcHBpbmcgdW50aWwgc3RpZmYgcGVha3MgZm9ybS4NCg0KIyMjIEFzc2VtYmx5DQoxLiAqKkxheWVyOioqIFBsYWNlIG9uZSBjaG9jb2xhdGUgc3BvbmdlIG9uIGEgc2VydmluZyBwbGF0dGVyLiBTcHJlYWQgYSBsYXllciBvZiBjaGVycnkgY29tcG90ZSBvdmVyIGl0LCBmb2xsb3dlZCBieSBhIGxheWVyIG9mIHdoaXBwZWQgY3JlYW0uIFJlcGVhdCB3aXRoIHRoZSBzZWNvbmQgc3BvbmdlLg0KMi4gKipUb3AgYW5kIEdhcm5pc2g6KiogVG9wIHdpdGggcmVtYWluaW5nIHdoaXBwZWQgY3JlYW0sIHNtb290aGluZyB0aGUgc3VyZmFjZS4gR2FybmlzaCB3aXRoIGNob2NvbGF0ZSBzaGF2aW5ncyBhbmQgZnJlc2ggY2hlcnJpZXMuDQozLiAqKkNoaWxsOioqIFJlZnJpZ2VyYXRlIGZvciBhdCBsZWFzdCAxIGhvdXIgYmVmb3JlIHNlcnZpbmcgdG8gYWxsb3cgdGhlIGZsYXZvcnMgdG8gbWVsZC4NCg0KRW5qb3kgYSBzbGljZSBvZiB0aGlzIGluZHVsZ2VudCBCbGFjayBGb3Jlc3QgY2FrZSB3aXRoIGEgZ2xhc3Mgb2YgTcO8bGxlci1DYXRvaXIgSGFhcmR0ZXIgQsO8cmdlcmdhcnRlbiBSaWVzbGFuZXIgQXVzbGVzZSAyMDE3IHRvIGNvbXBsZW1lbnQgdGhlIHJpY2ggY2hvY29sYXRlIGFuZCB0YW5neSBjaGVycnkgbm90ZXMu";export{G as default};
