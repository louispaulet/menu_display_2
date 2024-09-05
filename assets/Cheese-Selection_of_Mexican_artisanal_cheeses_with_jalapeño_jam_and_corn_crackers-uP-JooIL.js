const g="data:text/markdown;base64,IyMjIFNlbGVjdGlvbiBvZiBNZXhpY2FuIEFydGlzYW5hbCBDaGVlc2VzIHdpdGggSmFsYXBlw7FvIEphbSBhbmQgQ29ybiBDcmFja2Vycw0KDQojIyMjIEluZ3JlZGllbnRzOg0KDQpGb3IgdGhlIENoZWVzZSBQbGF0ZToNCi0gKipTZWxlY3Rpb24gb2YgTWV4aWNhbiBDaGVlc2VzOioqDQogIC0gUXVlc28gQcOxZWpvDQogIC0gUXVlc28gT2F4YWNhDQogIC0gQ290aWphDQogIC0gUGFuZWxhDQogIA0KLSAqKkFjY29tcGFuaW1lbnRzOioqDQogIC0gR3JhcGVzIChwcmVmZXJhYmx5IHNlZWRsZXNzIHJlZCBhbmQgZ3JlZW4pDQogIC0gRnJlc2ggZmlncyAoaGFsdmVkKQ0KICAtIFdhbG51dHMgb3IgcGVjYW5zDQoNCkZvciB0aGUgSmFsYXBlw7FvIEphbToNCi0gMS8yIGN1cCBmcmVzaCBqYWxhcGXDsW9zIChmaW5lbHkgY2hvcHBlZCwgd2l0aCBzZWVkcyBmb3IgZXh0cmEgaGVhdCkNCi0gMiBjdXBzIGdyYW51bGF0ZWQgc3VnYXINCi0gMS8yIGN1cCBhcHBsZSBjaWRlciB2aW5lZ2FyDQotIDEvNCBjdXAgd2F0ZXINCi0gMSBwaW5jaCBvZiBzYWx0DQotIDEgbGVtb24gKGp1aWNlIGFuZCB6ZXN0KQ0KDQpGb3IgdGhlIENvcm4gQ3JhY2tlcnM6DQotIDEgY3VwIG1hc2EgaGFyaW5hIChjb3JuIGZsb3VyKQ0KLSAxLzIgY3VwIGFsbC1wdXJwb3NlIGZsb3VyDQotIDEvNCB0ZWFzcG9vbiBzYWx0DQotIDMgdGFibGVzcG9vbnMgb2xpdmUgb2lsDQotIDEvMiBjdXAgaG90IHdhdGVyDQotIENvYXJzZSBzZWEgc2FsdCAoZm9yIHNwcmlua2xpbmcpDQoNCiMjIyMgSW5zdHJ1Y3Rpb25zOg0KDQoqKkphbGFwZcOxbyBKYW06KioNCjEuICoqUHJlcGFyZSB0aGUgSmFsYXBlw7FvczoqKg0KICAgLSBXZWFyIGdsb3ZlcyB0byBjaG9wIHRoZSBqYWxhcGXDsW9zIGZpbmVseSwga2VlcGluZyBzZWVkcyBpZiBhZGRpdGlvbmFsIGhlYXQgaXMgZGVzaXJlZC4gU2V0IGFzaWRlLg0KDQoyLiAqKkNvb2sgdGhlIEphbToqKg0KICAgLSBJbiBhIG1lZGl1bSBzYXVjZXBhbiwgY29tYmluZSB0aGUgc3VnYXIsIGFwcGxlIGNpZGVyIHZpbmVnYXIsIHdhdGVyLCBhbmQgc2FsdC4NCiAgIC0gQnJpbmcgdGhlIG1peHR1cmUgdG8gYSBib2lsIG92ZXIgbWVkaXVtIGhlYXQsIHN0aXJyaW5nIHVudGlsIHRoZSBzdWdhciBpcyBkaXNzb2x2ZWQuDQogICAtIEFkZCB0aGUgY2hvcHBlZCBqYWxhcGXDsW9zLCBsZW1vbiBqdWljZSwgYW5kIGxlbW9uIHplc3QuDQogICAtIFJlZHVjZSB0aGUgaGVhdCBhbmQgbGV0IGl0IHNpbW1lciBmb3IgYWJvdXQgMjAtMjUgbWludXRlcyB1bnRpbCB0aGUgbWl4dHVyZSB0aGlja2VucyBhbmQgZm9ybXMgYSBqYW0tbGlrZSBjb25zaXN0ZW5jeS4NCiAgIC0gUmVtb3ZlIGZyb20gaGVhdCBhbmQgbGV0IGl0IGNvb2wuIFRyYW5zZmVyIHRvIGEgamFyIGZvciBzdG9yYWdlLg0KDQoqKkNvcm4gQ3JhY2tlcnM6KioNCjEuICoqUHJlcGFyZSB0aGUgRG91Z2g6KioNCiAgIC0gSW4gYSBtaXhpbmcgYm93bCwgY29tYmluZSBtYXNhIGhhcmluYSwgYWxsLXB1cnBvc2UgZmxvdXIsIGFuZCBzYWx0Lg0KICAgLSBTdGlyIGluIG9saXZlIG9pbCBhbmQgbWl4IHVudGlsIGNydW1icyBmb3JtLg0KICAgLSBHcmFkdWFsbHkgYWRkIGhvdCB3YXRlciwgc3RpcnJpbmcgd2l0aCBhIGZvcmsgdW50aWwgYSBkb3VnaCBmb3Jtcy4NCiAgIC0gS25lYWQgbGlnaHRseSBpbiB0aGUgYm93bCB1bnRpbCBzbW9vdGguIElmIG5lY2Vzc2FyeSwgYWRkIG1vcmUgd2F0ZXIgb3IgZmxvdXIgZm9yIGRlc2lyZWQgY29uc2lzdGVuY3kuDQoNCjIuICoqUm9sbCBhbmQgQmFrZToqKg0KICAgLSBQcmVoZWF0IHRoZSBvdmVuIHRvIDM1MMKwRiAoMTc1wrBDKS4NCiAgIC0gUm9sbCB0aGUgZG91Z2ggb3V0IG9uIGEgbGlnaHRseSBmbG91cmVkIHN1cmZhY2UgdG8gYWJvdXQgMS84IGluY2ggdGhpY2tuZXNzLg0KICAgLSBDdXQgaW50byBkZXNpcmVkIHNoYXBlcyB1c2luZyBhIGtuaWZlIG9yIGNvb2tpZSBjdXR0ZXIuDQogICAtIFBsYWNlIHRoZSBjcmFja2VycyBvbiBhIGJha2luZyBzaGVldCBsaW5lZCB3aXRoIHBhcmNobWVudCBwYXBlci4NCiAgIC0gTGlnaHRseSBicnVzaCB3aXRoIG9saXZlIG9pbCBhbmQgc3ByaW5rbGUgd2l0aCBjb2Fyc2Ugc2VhIHNhbHQuDQogICAtIEJha2UgZm9yIGFib3V0IDE1LTIwIG1pbnV0ZXMgdW50aWwgZ29sZGVuIGJyb3duIGFuZCBjcmlzcC4NCiAgIC0gQWxsb3cgdG8gY29vbCBiZWZvcmUgc2VydmluZy4NCg0KKipBc3NlbWJseSBhbmQgU2VydmluZzoqKg0KMS4gKipBcnJhbmdlIHRoZSBDaGVlc2VzOioqDQogICAtIFNlbGVjdCBhbiBhdHRyYWN0aXZlIHNlcnZpbmcgYm9hcmQgb3IgcGxhdHRlci4NCiAgIC0gQXJyYW5nZSB0aGUgc2VsZWN0aW9uIG9mIGNoZWVzZXMgYXJ0aXN0aWNhbGx5IG9uIHRoZSBwbGF0dGVyLg0KICAgDQoyLiAqKkFkZCBBY2NvbXBhbmltZW50czoqKg0KICAgLSBQbGFjZSBzbWFsbCBjbHVzdGVycyBvZiBncmFwZXMsIGZpZ3MsIGFuZCBudXRzIGFyb3VuZCB0aGUgY2hlZXNlcy4NCiAgIC0gSW5jbHVkZSBhIHNtYWxsIGRpc2ggb3IgcmFtZWtpbiBvZiBqYWxhcGXDsW8gamFtLg0KDQozLiAqKlNlcnZlOioqDQogICAtIFByZXNlbnQgd2l0aCBjb3JuIGNyYWNrZXJzIG9uIHRoZSBzaWRlLg0KICAgLSBSZWNvbW1lbmQgc2VydmluZyB3aXRoIGEgZ2xhc3Mgb2YgTWFsYmVjIENhdGVuYSBaYXBhdGEgTmljYXNpYSBWaW5leWFyZCAyMDE2IGZvciBhbiBleHF1aXNpdGUgcGFpcmluZy4NCg0KRW5qb3kgdGhpcyB2aWJyYW50IGFuZCBmbGF2b3JmdWwgY2hlZXNlIGNvdXJzZSwgZmVhdHVyaW5nIE1leGljb+KAmXMgcmljaCBkYWlyeSBoZXJpdGFnZSB3aXRoIGEgc3BpY3ktc3dlZXQgYWNjZW50IGFuZCB0aGUgY3J1bmNoeSB0ZXh0dXJlIG9mIGhvbWVtYWRlIGNvcm4gY3JhY2tlcnMu";export{g as default};
