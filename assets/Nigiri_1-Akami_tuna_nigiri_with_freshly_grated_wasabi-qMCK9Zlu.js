const g="data:text/markdown;base64,DQojIEFrYW1pIFR1bmEgTmlnaXJpIHdpdGggRnJlc2hseSBHcmF0ZWQgV2FzYWJpDQoNCkNyZWF0ZSBhIHN1YmxpbWUgc3VzaGkgZXhwZXJpZW5jZSB3aXRoIGRlbGljYXRlIHNsaWNlcyBvZiBha2FtaSB0dW5hIHBhaXJlZCB3aXRoIHRoZSBmaWVyeSB5ZXQgZnJhZ3JhbnQgcHVuY2ggb2YgZnJlc2ggd2FzYWJpLiBUaGlzIGRpc2ggaXMgYmVzdCBlbmpveWVkIHdpdGggYSBnbGFzcyBvZiBLdWJvdGEgU2VuanUgR2luam8sIGFjY2VudHVhdGluZyB0aGUgdGVuZGVyIHN3ZWV0bmVzcyBvZiB0aGUgdHVuYS4gDQoNCiMjIEluZ3JlZGllbnRzDQoNCi0gKipTdXNoaSBSaWNlKioNCiAgLSAyIGN1cHMgc3VzaGkgcmljZQ0KICAtIDIgMS80IGN1cHMgd2F0ZXINCiAgLSAxLzQgY3VwIHJpY2UgdmluZWdhcg0KICAtIDIgdGFibGVzcG9vbnMgc3VnYXINCiAgLSAxLzIgdGVhc3Bvb24gc2FsdA0KDQotICoqVHVuYSoqDQogIC0gMjAwIGdyYW1zIHN1c2hpLWdyYWRlIGFrYW1pIChsZWFuIGN1dCBvZiB0dW5hKQ0KICAtIFBpbmNoIG9mIHNlYSBzYWx0IChvcHRpb25hbCwgZm9yIHNlYXNvbmluZykNCg0KLSAqKldhc2FiaSoqDQogIC0gMSB0YWJsZXNwb29uIGZyZXNobHkgZ3JhdGVkIHdhc2FiaSAob3IgaGlnaC1xdWFsaXR5IHJlYWR5LW1hZGUgd2FzYWJpIHBhc3RlKQ0KDQotICoqVG8gU2VydmUqKg0KICAtIFNveSBzYXVjZSwgZm9yIGRpcHBpbmcNCiAgLSBQaWNrbGVkIGdpbmdlcg0KDQojIyBFcXVpcG1lbnQNCg0KLSBSaWNlIGNvb2tlciBvciBoZWF2eS1ib3R0b21lZCBwb3QNCi0gQmFtYm9vIHJvbGxpbmcgbWF0IChvcHRpb25hbCkNCi0gU2hhcnAgc3VzaGkga25pZmUNCg0KIyMgSW5zdHJ1Y3Rpb25zDQoNCiMjIyBQcmVwYXJpbmcgU3VzaGkgUmljZQ0KDQoxLiAqKlJpbnNlIHRoZSBSaWNlOioqIFJpbnNlIHRoZSBzdXNoaSByaWNlIHdpdGggY29sZCB3YXRlciB1bnRpbCB0aGUgd2F0ZXIgcnVucyBjbGVhci4gVGhpcyByZW1vdmVzIGV4Y2VzcyBzdGFyY2ggYW5kIHByZXZlbnRzIHRoZSByaWNlIGZyb20gYmVjb21pbmcgZ3VtbXkuDQoNCjIuICoqQ29vayB0aGUgUmljZToqKiBBZGQgdGhlIHJpbnNlZCBzdXNoaSByaWNlIGFuZCBtZWFzdXJlZCB3YXRlciB0byBhIHJpY2UgY29va2VyLiBJZiBjb29raW5nIG9uIGEgc3RvdmUsIGJyaW5nIHRvIGEgYm9pbCwgdGhlbiBsb3dlciB0byBhIHNpbW1lciwgY292ZXJpbmcgdGlnaHRseSBmb3IgYWJvdXQgMjAgbWludXRlcywgdW50aWwgYWxsIHdhdGVyIGlzIGFic29yYmVkLg0KDQozLiAqKlNlYXNvbiB0aGUgUmljZToqKiBJbiBhIHNtYWxsIHNhdWNlcGFuIG92ZXIgbG93IGhlYXQsIGNvbWJpbmUgcmljZSB2aW5lZ2FyLCBzdWdhciwgYW5kIHNhbHQuIFN0aXIgdW50aWwgZGlzc29sdmVkLiBPbmNlIHRoZSByaWNlIGlzIGRvbmUsIHRyYW5zZmVyIGl0IHRvIGEgbGFyZ2UgYm93bCBhbmQgZ2VudGx5IGZvbGQgaW4gdGhlIHZpbmVnYXIgbWl4dHVyZSB1c2luZyBhIHdvb2RlbiBzcG9vbiBvciByaWNlIHBhZGRsZS4gQWxsb3cgaXQgdG8gY29vbCB0byByb29tIHRlbXBlcmF0dXJlIGNvdmVyZWQgd2l0aCBhIGRhbXAgY2xvdGguDQoNCiMjIyBQcmVwYXJpbmcgdGhlIFR1bmENCg0KNC4gKipTbGljZSB0aGUgVHVuYToqKiBVc2luZyBhIHNoYXJwIHN1c2hpIGtuaWZlLCBzbGljZSB0aGUgdHVuYSBhZ2FpbnN0IHRoZSBncmFpbiBpbnRvIHRoaW4sIGV2ZW4gcGllY2VzIGFib3V0IDEvNCBpbmNoIHRoaWNrIGFuZCAyIGluY2hlcyBsb25nLiBGb3IgdGhlIHBlcmZlY3Qgc2xpY2UsIGFpbSBmb3IgdW5pZm9ybSB0aGlja25lc3MgYW5kIGVsZWdhbmNlLg0KDQojIyMgQXNzZW1ibGluZyB0aGUgTmlnaXJpDQoNCjUuICoqU2hhcGUgdGhlIFJpY2U6KiogV2l0aCBzbGlnaHRseSB3ZXQgaGFuZHMgdG8gcHJldmVudCBzdGlja2luZywgdGFrZSBhYm91dCAyIHRhYmxlc3Bvb25zIG9mIHN1c2hpIHJpY2UgYW5kIHNoYXBlIGludG8gYW4gb3ZhbC1zaGFwZWQgbW91bmQgdXNpbmcgZ2VudGxlIHByZXNzdXJlLg0KDQo2LiAqKkFzc2VtYmxlIE5pZ2lyaToqKiBBZGQgYSBkYWIgb2YgZnJlc2hseSBncmF0ZWQgd2FzYWJpIGF0b3AgZWFjaCByaWNlIG1vdW5kLCB0aGVuIGxheSBhIHNsaWNlIG9mIHR1bmEgb3ZlciB0aGUgcmljZS4gUHJlc3MgZ2VudGx5IHRvIGFsbG93IHRoZSBmaXNoIHRvIGFkaGVyZS4NCg0KNy4gKipSZXBlYXQ6KiogUmVwZWF0IHdpdGggcmVtYWluaW5nIGluZ3JlZGllbnRzIHVudGlsIGFsbCByaWNlIG9yIHR1bmEgc2xpY2VzIGFyZSB1c2VkLg0KDQojIyMgUHJlc2VudGF0aW9uDQoNCjguICoqUGxhdGUgdGhlIE5pZ2lyaToqKiBBcnJhbmdlIHRoZSB0dW5hIG5pZ2lyaSBvbiBhIHNlcnZpbmcgcGxhdHRlci4gU2VydmUgaW1tZWRpYXRlbHkgd2l0aCBhIHNtYWxsIGRpc2ggb2Ygc295IHNhdWNlIGFuZCBhIHNtYWxsIHBpbGUgb2YgcGlja2xlZCBnaW5nZXIgb24gdGhlIHNpZGUuDQoNCiMjIyBTZXJ2aW5nIFN1Z2dlc3Rpb24NCg0KOS4gKipXaW5lIFBhaXJpbmc6KiogUGFpciBlYWNoIHNlcnZpbmcgb2YgbmlnaXJpIHdpdGggYSBnbGFzcyBvZiBLdWJvdGEgU2VuanUgR2luam8gdG8gZW5oYW5jZSB0aGUgY2xlYW4gZmxhdm9ycyBvZiB0aGUgdHVuYSBhbmQgdGhlIHdhc2FiaSdzIGVhcnRoaW5lc3MuDQoNCkVuam95IHRoaXMgZGVsaWNhdGUgYW5kIGFydGZ1bCBuaWdpcmkgZGlzaCwgY2VsZWJyYXRpbmcgdGhlIHB1cml0eSBvZiBha2FtaSB0dW5hIGFuZCB0aGUgbnVhbmNlIG9mIGZyZXNobHkgZ3JhdGVkIHdhc2FiaS4=";export{g as default};
