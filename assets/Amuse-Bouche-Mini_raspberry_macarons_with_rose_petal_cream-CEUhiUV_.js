const g="data:text/markdown;base64,IyBNaW5pIFJhc3BiZXJyeSBNYWNhcm9ucyB3aXRoIFJvc2UgUGV0YWwgQ3JlYW0NCg0KIyMjIFdpbmUgUGFpcmluZzoNCkNow6J0ZWF1IGQnWXF1ZW0gU2F1dGVybmVzIDIwMTcNCg0KIyMjIEluZ3JlZGllbnRzOg0KDQojIyMjIEZvciB0aGUgTWFjYXJvbiBTaGVsbHM6DQotIDEyNWcgZ3JvdW5kIGFsbW9uZHMNCi0gMTI1ZyBpY2luZyBzdWdhcg0KLSA5MGcgZWdnIHdoaXRlcywgYWdlZCBvdmVybmlnaHQNCi0gMTEwZyBjYXN0b3Igc3VnYXINCi0gUGluY2ggb2YgY3JlYW0gb2YgdGFydGFyDQotIFBpbmsgZm9vZCBjb2xvcmluZyAoZ2VsIHByZWZlcnJlZCkNCg0KIyMjIyBGb3IgdGhlIFJvc2UgUGV0YWwgQ3JlYW0gRmlsbGluZzoNCi0gMTI1ZyB1bnNhbHRlZCBidXR0ZXIsIHNvZnRlbmVkDQotIDE1MGcgaWNpbmcgc3VnYXINCi0gMiB0YnNwIHJhc3BiZXJyeSBwdXJlZQ0KLSAxIHRzcCByb3NlIHdhdGVyDQotIFBpbmsgcm9zZSBwZXRhbHMgKGVkaWJsZSksIGZpbmVseSBjaG9wcGVkDQoNCiMjIyMgRm9yIERlY29yYXRpb246DQotIEZyZXNoIHJhc3BiZXJyaWVzDQotIEVkaWJsZSByb3NlIHBldGFscw0KDQojIyMgSW5zdHJ1Y3Rpb25zOg0KDQojIyMjIFByZXBhcmUgdGhlIE1hY2Fyb24gU2hlbGxzOg0KMS4gKipQcmVoZWF0IE92ZW46KiogUHJlaGVhdCB5b3VyIG92ZW4gdG8gMTUwwrBDICgzMDDCsEYpLCBmYW4tZm9yY2VkLg0KMi4gKipTaWZ0IERyeSBJbmdyZWRpZW50czoqKiBTaWZ0IHRoZSBncm91bmQgYWxtb25kcyBhbmQgaWNpbmcgc3VnYXIgdG9nZXRoZXIsIGRpc2NhcmRpbmcgYW55IGxhcmdlIHBhcnRpY2xlcy4gUmVwZWF0IHRoaXMgcHJvY2VzcyB0d2ljZSB0byBlbnN1cmUgYSBmaW5lIG1peHR1cmUuDQozLiAqKldoaXAgdGhlIEVnZyBXaGl0ZXM6KiogSW4gYSBjbGVhbiBib3dsLCBzdGFydCBiZWF0aW5nIHRoZSBlZ2cgd2hpdGVzIHVudGlsIGZvYW15LiBBZGQgdGhlIGNyZWFtIG9mIHRhcnRhciBhbmQgY29udGludWUgYmVhdGluZyB1bnRpbCBzb2Z0IHBlYWtzIGZvcm0uDQo0LiAqKkFkZCBTdWdhciBhbmQgQ29sb3I6KiogR3JhZHVhbGx5IGFkZCB0aGUgY2FzdG9yIHN1Z2FyLCBvbmUgdGFibGVzcG9vbiBhdCBhIHRpbWUsIGJlYXRpbmcgd2VsbCBiZXR3ZWVuIGFkZGl0aW9ucy4gQ29udGludWUgdG8gYmVhdCB1bnRpbCBzdGlmZiBwZWFrcyBmb3JtIGFuZCB0aGUgbWl4dHVyZSBiZWNvbWVzIGdsb3NzeS4gQWRkIHRoZSBmb29kIGNvbG9yaW5nIGFuZCBiZWF0IHVudGlsIGNvbWJpbmVkLg0KNS4gKipNYWNhcm9uYWdlOioqIEdlbnRseSBmb2xkIHRoZSBhbG1vbmQgbWl4dHVyZSBpbnRvIHRoZSBtZXJpbmd1ZSwgdXNpbmcgYSBzcGF0dWxhLiBNaXggdW50aWwgeW91IGFjaGlldmUgYSAibGF2YS1saWtlIiBjb25zaXN0ZW5jeSDigJQgaXQgc2hvdWxkIGZsb3cgb2ZmIHRoZSBzcGF0dWxhIGluIHRoaWNrIHJpYmJvbnMuDQo2LiAqKlBpcGUgdGhlIFNoZWxsczoqKiBUcmFuc2ZlciB0aGUgYmF0dGVyIGludG8gYSBwaXBpbmcgYmFnIGZpdHRlZCB3aXRoIGEgcm91bmQgdGlwLiBQaXBlIHNtYWxsIGNpcmNsZXMgKGFib3V0IDMgY20gaW4gZGlhbWV0ZXIpIG9udG8gYSBiYWtpbmcgc2hlZXQgbGluZWQgd2l0aCBwYXJjaG1lbnQgcGFwZXIuIFRhcCB0aGUgYmFraW5nIHNoZWV0IG9uIHRoZSBjb3VudGVyIHRvIHJlbGVhc2UgYW55IGFpciBidWJibGVzLg0KNy4gKipSZXN0IHRoZSBTaGVsbHM6KiogQWxsb3cgdGhlIG1hY2Fyb24gc2hlbGxzIHRvIHNpdCBhdCByb29tIHRlbXBlcmF0dXJlIGZvciAyMC0zMCBtaW51dGVzIHRvIGZvcm0gYSBza2luLiBUaGV5IHNob3VsZCBub3Qgc3RpY2sgdG8geW91ciBmaW5nZXJ0aXAgd2hlbiB0b3VjaGVkIGxpZ2h0bHkuDQo4LiAqKkJha2U6KiogQmFrZSBpbiB0aGUgcHJlaGVhdGVkIG92ZW4gZm9yIDEyLTE1IG1pbnV0ZXMuIENoZWNrIGFmdGVyIDEyIG1pbnV0ZXMg4oCUIHRoZSBtYWNhcm9ucyBzaG91bGQgZWFzaWx5IGxpZnQgb2ZmIHRoZSBiYWtpbmcgc2hlZXQgd2hlbiB0aGV5IGFyZSBkb25lLg0KOS4gKipDb29sOioqIExldCB0aGUgc2hlbGxzIGNvb2wgY29tcGxldGVseSBvbiBhIHdpcmUgcmFjay4NCg0KIyMjIyBQcmVwYXJlIHRoZSBSb3NlIFBldGFsIENyZWFtIEZpbGxpbmc6DQoxLiAqKkJlYXQgdGhlIEJ1dHRlcjoqKiBJbiBhIGJvd2wsIGJlYXQgdGhlIHNvZnRlbmVkIGJ1dHRlciB1bnRpbCBwYWxlIGFuZCBmbHVmZnkuDQoyLiAqKkFkZCBJY2luZyBTdWdhcjoqKiBHcmFkdWFsbHkgYWRkIGluIHRoZSBpY2luZyBzdWdhciwgYmVhdGluZyB3ZWxsIGFmdGVyIGVhY2ggYWRkaXRpb24uDQozLiAqKkZsYXZvciB0aGUgQ3JlYW06KiogTWl4IGluIHRoZSByYXNwYmVycnkgcHVyZWUgYW5kIHJvc2Ugd2F0ZXIuIEZvbGQgaW4gdGhlIGZpbmVseSBjaG9wcGVkIHJvc2UgcGV0YWxzLg0KNC4gKipDaGlsbDoqKiBSZWZyaWdlcmF0ZSB0aGUgZmlsbGluZyBmb3IgYWJvdXQgMjAgbWludXRlcyB0byBmaXJtIHVwIHNsaWdodGx5IGJlZm9yZSBwaXBpbmcuDQoNCiMjIyMgQXNzZW1ibGUgdGhlIE1hY2Fyb25zOg0KMS4gKipNYXRjaCBTaGVsbHM6KiogUGFpciB0aGUgbWFjYXJvbiBzaGVsbHMgYnkgc2l6ZSBhbmQgc2hhcGUuDQoyLiAqKlBpcGUgRmlsbGluZzoqKiBTcG9vbiB0aGUgcm9zZSBwZXRhbCBjcmVhbSBpbnRvIGEgcGlwaW5nIGJhZyBmaXR0ZWQgd2l0aCBhIHNtYWxsIHJvdW5kIHRpcC4gUGlwZSBhIHNtYWxsIGFtb3VudCBvZiBmaWxsaW5nIG9udG8gdGhlIGZsYXQgc2lkZSBvZiBhIHNoZWxsLCBhbmQgZ2VudGx5IHNhbmR3aWNoIHdpdGggdGhlIG1hdGNoaW5nIHNoZWxsLg0KMy4gKipEZWNvcmF0ZToqKiBHYXJuaXNoIHdpdGggZnJlc2ggcmFzcGJlcnJpZXMgYW5kIGEgc3ByaW5rbGUgb2YgZWRpYmxlIHJvc2UgcGV0YWxzIG9uIHRvcCBvZiBlYWNoIG1hY2Fyb24uDQoNCiMjIyMgU2VydmluZyBTdWdnZXN0aW9uOg0KLSAqKlBsYXRlIHlvdXIgbWFjYXJvbnMgb24gYSB0aWVyZWQgc3RhbmQgb3IgZWxlZ2FudCBzZXJ2aW5nIHBsYXR0ZXIuKioNCi0gKipQYWlyIHdpdGggYSBnbGFzcyBvZiBDaMOidGVhdSBkJ1lxdWVtIFNhdXRlcm5lcyAyMDE3IHRvIGNvbXBsZW1lbnQgdGhlIGRlbGljYXRlIGZsYXZvcnMuKioNCg0KIyMjIENoZWYncyBUaXBzOg0KLSBBZ2luZyBFZ2cgV2hpdGVzOiBUaGlzIGhlbHBzIHRvIHN0YWJpbGl6ZSB0aGUgbWVyaW5ndWUuDQotIFJlc3RpbmcgVGltZTogQ3J1Y2lhbCBmb3IgYWNoaWV2aW5nIHRoZSBjbGFzc2ljIG1hY2Fyb24gImZlZXQuIg0KLSBTdG9yYWdlOiBTdG9yZSBpbiBhbiBhaXJ0aWdodCBjb250YWluZXIgaW4gdGhlIGZyaWRnZSBmb3IgdXAgdG8gMyBkYXlzLiBNYWNhcm9ucyBvZnRlbiB0YXN0ZSBiZXR0ZXIgYWZ0ZXIgYSBkYXkgb2Yg4oCcbWF0dXJpbmfigJ0gaW4gdGhlIGZyaWRnZS4=";export{g as default};
