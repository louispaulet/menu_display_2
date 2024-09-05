const g="data:text/markdown;base64,IyMjIFNlYXNvbmFsIFZlZ2V0YWJsZSBhbmQgU2Vhd2VlZCBTYWxhZCB3aXRoIFl1enUgRHJlc3NpbmcNCg0KIyMjIyBJbmdyZWRpZW50cw0KDQoqKkZvciB0aGUgU2FsYWQ6KioNCi0gMSBjdXAgbWl4ZWQgc2Vhc29uYWwgdmVnZXRhYmxlcyAoZS5nLiwgcmFkaXNoZXMsIGNhcnJvdHMsIGN1Y3VtYmVyLCBiZWxsIHBlcHBlcnMpDQotIDEvMiBjdXAgc2Vhd2VlZCAoV2FrYW1lIG9yIEFyYW1lIHByZWZlcnJlZCksIHNvYWtlZCB1bnRpbCB0ZW5kZXINCi0gMSB0YWJsZXNwb29uIHNlc2FtZSBzZWVkcywgbGlnaHRseSB0b2FzdGVkDQotIDEvNCBjdXAgbWljcm9ncmVlbnMgKG9wdGlvbmFsKQ0KLSAxIHRhYmxlc3Bvb24gcGlja2xlZCBnaW5nZXIsIGZpbmVseSBzbGljZWQNCg0KKipGb3IgdGhlIFl1enUgRHJlc3Npbmc6KioNCi0gMyB0YWJsZXNwb29ucyB5dXp1IGp1aWNlDQotIDEgdGFibGVzcG9vbiByaWNlIHZpbmVnYXINCi0gMSB0YWJsZXNwb29uIHNveSBzYXVjZQ0KLSAxIHRhYmxlc3Bvb24gbWlyaW4NCi0gMSB0YWJsZXNwb29uIGhvbmV5DQotIDEgdGVhc3Bvb24gZ3JhdGVkIGZyZXNoIGdpbmdlcg0KLSAxLzQgY3VwIGxpZ2h0IG9saXZlIG9pbCBvciBncmFwZXNlZWQgb2lsDQotIFNhbHQgYW5kIHBlcHBlciB0byB0YXN0ZQ0KDQojIyMjIEluc3RydWN0aW9ucw0KDQoxLiAqKlByZXBhcmUgdGhlIFZlZ2V0YWJsZXMgYW5kIFNlYXdlZWQ6KioNCiAgIC0gVGhpbmx5IHNsaWNlIHRoZSBzZWFzb25hbCB2ZWdldGFibGVzIHVzaW5nIGEgbWFuZG9saW4gb3Igc2hhcnAga25pZmUgZm9yIHVuaWZvcm0gcGllY2VzLg0KICAgLSBJZiB1c2luZyBXYWthbWUgb3IgQXJhbWUgc2Vhd2VlZCwgc29hayBpbiB3YXJtIHdhdGVyIGZvciBhYm91dCA1IG1pbnV0ZXMgdW50aWwgcmVoeWRyYXRlZCBhbmQgdGVuZGVyLiBEcmFpbiB3ZWxsLg0KDQoyLiAqKk1ha2UgdGhlIFl1enUgRHJlc3Npbmc6KioNCiAgIC0gSW4gYSBzbWFsbCBtaXhpbmcgYm93bCwgd2hpc2sgdG9nZXRoZXIgdGhlIHl1enUganVpY2UsIHJpY2UgdmluZWdhciwgc295IHNhdWNlLCBtaXJpbiwgaG9uZXksIGFuZCBncmF0ZWQgZ2luZ2VyIHVudGlsIHdlbGwgY29tYmluZWQuDQogICAtIFNsb3dseSBkcml6emxlIGluIHRoZSBvbGl2ZSBvaWwgd2hpbGUgY29udGludWluZyB0byB3aGlzaywgY3JlYXRpbmcgYSBzbW9vdGgsIGVtdWxzaWZpZWQgZHJlc3NpbmcuDQogICAtIFNlYXNvbiB3aXRoIHNhbHQgYW5kIHBlcHBlciB0byB0YXN0ZSwgYWRqdXN0aW5nIGFjaWRpdHkgd2l0aCBtb3JlIHl1enUganVpY2UgaWYgbmVjZXNzYXJ5Lg0KDQozLiAqKkFzc2VtYmxlIHRoZSBTYWxhZDoqKg0KICAgLSBJbiBhIGxhcmdlIGJvd2wsIGdlbnRseSB0b3NzIHRoZSBtaXhlZCBzZWFzb25hbCB2ZWdldGFibGVzIGFuZCByZWh5ZHJhdGVkIHNlYXdlZWQgd2l0aCBzZXZlcmFsIHRhYmxlc3Bvb25zIG9mIHRoZSB5dXp1IGRyZXNzaW5nLg0KICAgLSBBcnJhbmdlIHRoZSBkcmVzc2VkIHZlZ2V0YWJsZXMgYW5kIHNlYXdlZWQgYXJ0ZnVsbHkgb24gYSBzZXJ2aW5nIHBsYXR0ZXIuDQogICAtIEdhcm5pc2ggd2l0aCBzZXNhbWUgc2VlZHMsIG1pY3JvZ3JlZW5zLCBhbmQgcGlja2xlZCBnaW5nZXIuDQoNCjQuICoqU2VydmU6KioNCiAgIC0gU2VydmUgaW1tZWRpYXRlbHkgdG8gZW5qb3kgdGhlIGZyZXNoLCBjcmlzcCB0ZXh0dXJlcyBhbmQgdmlicmFudCBmbGF2b3JzLg0KICAgLSBQYWlyIHdpdGggYSBjaGlsbGVkIGdsYXNzIG9mIERhc3NhaSAyMyBKdW5tYWkgRGFpZ2luam8gdG8gZW5oYW5jZSB0aGUgYXJvbWF0aWMgbm90ZXMgb2YgeXV6dSBhbmQgdGhlIHVtYW1pLXJpY2ggc2Vhd2VlZC4NCg0KIyMjIyBUaXBzOg0KLSBVc2UgYSBtaXggb2YgY29sb3JmdWwgdmVnZXRhYmxlcyB0byBhZGQgdmlzdWFsIGFwcGVhbCB0byB0aGUgc2FsYWQuDQotIEFkanVzdCBzZWFzb25pbmcgb2YgdGhlIGRyZXNzaW5nIGJhc2VkIG9uIHRoZSBzb3VybmVzcyBvZiB0aGUgeXV6dSBqdWljZSBhdmFpbGFibGUuDQotIENoaWxsIHRoZSBzYWxhZCBmb3IgYWJvdXQgMTAgbWludXRlcyBiZWZvcmUgc2VydmluZyBmb3IgYSBtb3JlIHJlZnJlc2hpbmcgdGFzdGUu";export{g as default};
